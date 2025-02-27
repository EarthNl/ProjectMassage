const express = require("express");
const router = express.Router();
var md5 = require("md5");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { db } = require("../config/db");
const { padCRC32, addfileBase64, removefile } = require("../constants/constant");

if (!fs.existsSync("uploads/rooms")) {
  fs.mkdirSync("uploads/rooms");
}

//get
router.post("/get", async (req, res) => {
  try {
    const json = req.body;

    if (!json) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    let page = parseInt(json["page"]) || 1;
    let pageSize = parseInt(json["pageSize"]) || 10;
    let offset = (page - 1) * pageSize;

    const [res_total] = await db.query(`SELECT COUNT(*) AS total FROM booking WHERE CONCAT_WS(' ',name) LIKE '%' ? '%'`,[json["search"]]);
    const [res_booking] = await db.query(`
        SELECT A.*
        FROM booking AS A
        WHERE  CONCAT_WS(' ',A.name) LIKE '%' ? '%' 
        GROUP BY booking_id
        ORDER BY A.creationDate DESC 
        LIMIT ? OFFSET ?`,
      [json["search"], pageSize, offset]
    );

    if (res_booking) {
      let total = parseInt(res_total[0].total);
      let totalPages = Math.ceil(total / pageSize);
      res.send({
        data: res_booking,
        totalCount: total,
        totalPages: totalPages,
        status: "200",
        message: "SUCCESS",
        detail: "successful",
      });
      return;
    }

    res.send({
      status: "404",
      message: "WARNING",
      detail: "No Data",
    });

  } catch (err) {
    res.send({ status: "500", message: "ERROR", detail: err.message });
  }
});

//getbyid
router.post('/getbyid', async (req, res) => {
try {
    const json = req.body;

    if (!json['booking_id']) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    const [res_booking] = await db.query(`SELECT A.* FROM booking AS A WHERE A.booking_id = ?`,[json["booking_id"]]);

    if (res_booking && res_booking.length > 0) {
      res.send({
        data: res_booking[0],
        status: "200",
        message: "SUCCESS",
        detail: "successful",
      });
      return;
    }

     res.send({
       status: "404",
       message: "WARNING",
       detail: "No Data",
     });

  } catch (err) {
    res.send({ status: "500", message: 'ERROR',detail:err.message });
  }
});

router.post('/get-list', async (req, res) => {
  try {
      const [res_booking] = await db.query(`SELECT A.*
        ,(
          SELECT image_url FROM booking_images 
          WHERE booking_id = A.booking_id 
          ORDER BY image_idx DESC LIMIT 1
         ) AS image_url
         FROM booking AS A
        
        
        
        `);
      if (res_booking && res_booking.length > 0) {
        res.send({
          data: res_booking,
          status: "200",
          message: "SUCCESS",
          detail: "successful",
        });
        return;
      }
  
       res.send({
         status: "404",
         message: "WARNING",
         detail: "No Data",
       });
  
    } catch (err) {
      res.send({ status: "500", message: 'ERROR',detail:err.message });
    }
  });

//insert
router.post("/insert", async (req, res) => {
  try {
    const json = req.body;

    if (!json) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    await db.query(`INSERT INTO booking (name
        ,email
        ,phone
        ,date
        ,time
        ,service_id
        ,creationDate) VALUES (?,?,?,?,?,?,NOW())`
        ,[json["customer_name"]
        ,json["customer_email"]
        ,json["customer_phone"]
        ,json["booking_date"]
        ,json["booking_time"]
        ,json["service_id"]
        ]);
 
    res.send({
      status: "200",
      message: "SUCCESS",
      detail: "Insert successful",
    });

  } catch (err) {
    res.send({ status: "500", message: "ERROR", detail: err.message });
  }
});

//update
router.post("/update", async (req, res) => {
  try {
    const json = req.body;

    if (!json) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    const [res_booking] = await db.query(`SELECT * FROM booking WHERE booking_id = ?`,[json["booking_id"]]);

    if (res_booking && res_booking.length > 0) {

      if (json["booking_imgs"] && json["booking_imgs"].length > 0) {

        //ลบรูปเก่า
        const [oldimgs] = await db.query(`SELECT * FROM booking_images WHERE booking_id = ?`,[json["booking_id"]]);

        if (oldimgs && oldimgs.length > 0) {
          oldimgs.forEach(async (emt) => {
            removefile(emt.image_url);
          });
          await db.query(`DELETE FROM booking_images WHERE booking_id = ?`, [
            json["booking_id"],
          ]);
        }

        json["booking_imgs"].forEach(async (emt) => {
          const img_idv4 = uuidv4();
          const img_code = padCRC32(img_idv4).toString();
          const filePath = addfileBase64(emt, `uploads/rooms/${img_code}`);
          await db.query(
            `INSERT INTO booking_images (image_code,booking_id,image_url) VALUES (?,?,?)`,
            [img_code, json["booking_id"], filePath ? filePath : ""]
          );
        });
      }

      await db.query(
        `UPDATE booking SET 
        name = ?
        ,price = ?
        ,duration = ?
        ,description = ? WHERE booking_id = ?`,
        [
          json["booking_name"],
          json["booking_price"],
          json["booking_duration"],
          json["booking_desc"],
          json["booking_id"],
        ]
      );

      res.send({
        status: "200",
        message: "SUCCESS",
        detail: "successful",
      });

      return;
    }

    res.send({
      status: "404",
      message: "WARNING",
      detail: "No Data",
    });
  } catch (err) {
    res.send({ status: "500", message: "ERROR", detail: err.message });
  }
});

//delete
router.post('/delete', async (req, res) => {
  try {
      const json = req.body;

      if (!json['booking_id']) {
        res.send({
          status: "400",
          message: "WARNING",
          detail: "No Data found",
        });
        return;
      }
      
      const [res_booking] = await db.query(`SELECT * FROM booking WHERE booking_id = ?`, [json["booking_id"]]);
    
      if (res_booking && res_booking.length > 0) {
        //ลบรูปเก่า
        const [oldimgs] = await db.query(`SELECT * FROM booking_images WHERE booking_id = ?`,[json["booking_id"]]);

        if (oldimgs && oldimgs.length > 0) {
            oldimgs.forEach(async (emt) => {
            removefile(emt.image_url);
            });
            await db.query(`DELETE FROM booking_images WHERE booking_id = ?`, [json["booking_id"],]);
        }
   
        await db.query(`DELETE FROM booking WHERE booking_id = ?`,[json["booking_id"]]);

        res.send({
          status: "200",
          message: "SUCCESS",
          detail: "successful",
        });
        return
    }

    res.send({
      status: "404",
      message: "WARNING",
      detail: "No Data",
    });
    } catch (err) {
      res.send({ status: "500", message: 'ERROR',detail:err.message });
    }
});

module.exports = router;
