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
        ,B.name AS service_name
        ,B.duration AS service_duration
        FROM booking AS A
        LEFT JOIN service AS B ON B.service_id = A.service_id
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

    const [res_booking] = await db.query(`SELECT A.* 
      ,(
      SELECT name FROM booking_images 
      WHERE service_id = A.service_id  LIMIT 1
      ) AS service_name
      FROM booking AS A WHERE A.booking_id = ?`,[json["booking_id"]]);

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
       await db.query(
        `UPDATE booking SET 
          name = ?
         ,date = ?
         ,time = ?
         ,status = ?
         ,service_id = ?
        WHERE booking_id = ?`,
        [
          json["customer_name"],
          json["booking_date"],
          json["booking_time"],
          json["booking_status"],
          json["service_id"],
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
