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

    const [res_total] = await db.query(`SELECT COUNT(*) AS total FROM service WHERE CONCAT_WS(' ',name) LIKE '%' ? '%'`,[json["search"]]);
    const [res_service] = await db.query(`
        SELECT A.*
        ,GROUP_CONCAT(B.image_url) AS imgs
        FROM service AS A
        LEFT JOIN (SELECT * FROM service_images) AS B ON B.service_id = A.service_id
        WHERE  CONCAT_WS(' ',A.name) LIKE '%' ? '%' 
        GROUP BY service_id
        ORDER BY A.creationDate DESC 
        LIMIT ? OFFSET ?`,
      [json["search"], pageSize, offset]
    );

    if (res_service) {
      let total = parseInt(res_total[0].total);
      let totalPages = Math.ceil(total / pageSize);
      res.send({
        data: res_service,
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

    if (!json['service_id']) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    const [res_service] = await db.query(`SELECT A.*
      ,GROUP_CONCAT(B.image_url) AS imgs
      FROM service AS A
      LEFT JOIN (SELECT * FROM service_images) AS B ON B.service_id = A.service_id
      WHERE A.service_id = ?`,[json["service_id"]]);

    if (res_service && res_service.length > 0) {
      res.send({
        data: res_service[0],
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
      const [res_service] = await db.query(`SELECT A.*
        ,(
          SELECT image_url FROM service_images 
          WHERE service_id = A.service_id 
          ORDER BY image_idx DESC LIMIT 1
         ) AS image_url
         FROM service AS A
        
        
        
        `);
      if (res_service && res_service.length > 0) {
        res.send({
          data: res_service,
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

    await db.query(`INSERT INTO service (
        name
        ,price
        ,duration
        ,description
        ,creationDate) VALUES (?,?,?,?,NOW())`
        ,[json["service_name"]
        ,json["service_price"]
        ,json["service_duration"]
        ,json["service_desc"]]);
       

    const [res_service] = await db.query(`SELECT * FROM service ORDER BY service_id DESC`);

    let last_id = 0;
    if (res_service && res_service.length > 0) {
      last_id = res_service[0].service_id;
    }
 
    if (json["service_imgs"] && json["service_imgs"].length > 0) {
        json["service_imgs"].forEach(async emt => {
            const img_idv4 = uuidv4();
            const img_code = padCRC32(img_idv4).toString()
            const filePath = addfileBase64(emt,`uploads/rooms/${img_code}`);
            await db.query(`INSERT INTO service_images (image_code,service_id,image_url) VALUES (?,?,?)`,[img_code,last_id,filePath ? filePath : ""]);
        });
    }
 
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

    const [res_service] = await db.query(`SELECT * FROM service WHERE service_id = ?`,[json["service_id"]]);

    if (res_service && res_service.length > 0) {

      if (json["service_imgs"] && json["service_imgs"].length > 0) {

        //ลบรูปเก่า
        const [oldimgs] = await db.query(`SELECT * FROM service_images WHERE service_id = ?`,[json["service_id"]]);

        if (oldimgs && oldimgs.length > 0) {
          oldimgs.forEach(async (emt) => {
            removefile(emt.image_url);
          });
          await db.query(`DELETE FROM service_images WHERE service_id = ?`, [
            json["service_id"],
          ]);
        }

        json["service_imgs"].forEach(async (emt) => {
          const img_idv4 = uuidv4();
          const img_code = padCRC32(img_idv4).toString();
          const filePath = addfileBase64(emt, `uploads/rooms/${img_code}`);
          await db.query(
            `INSERT INTO service_images (image_code,service_id,image_url) VALUES (?,?,?)`,
            [img_code, json["service_id"], filePath ? filePath : ""]
          );
        });
      }

      await db.query(
        `UPDATE service SET 
        name = ?
        ,price = ?
        ,duration = ?
        ,description = ? WHERE service_id = ?`,
        [
          json["service_name"],
          json["service_price"],
          json["service_duration"],
          json["service_desc"],
          json["service_id"],
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

      if (!json['service_id']) {
        res.send({
          status: "400",
          message: "WARNING",
          detail: "No Data found",
        });
        return;
      }
      
      const [res_service] = await db.query(`SELECT * FROM service WHERE service_id = ?`, [json["service_id"]]);
    
      if (res_service && res_service.length > 0) {
        //ลบรูปเก่า
        const [oldimgs] = await db.query(`SELECT * FROM service_images WHERE service_id = ?`,[json["service_id"]]);

        if (oldimgs && oldimgs.length > 0) {
            oldimgs.forEach(async (emt) => {
            removefile(emt.image_url);
            });
            await db.query(`DELETE FROM service_images WHERE service_id = ?`, [json["service_id"],]);
        }
   
        await db.query(`DELETE FROM service WHERE service_id = ?`,[json["service_id"]]);

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
