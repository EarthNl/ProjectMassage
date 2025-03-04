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

    const [res_total] = await db.query(`SELECT COUNT(*) AS total FROM review WHERE CONCAT_WS(' ',name) LIKE '%' ? '%'`,[json["search"]]);
    const [res_review] = await db.query(`
        SELECT A.*
        ,B.name AS service_name
        ,B.duration AS service_duration
        FROM review AS A
        LEFT JOIN service AS B ON B.service_id = A.service_id
        WHERE  CONCAT_WS(' ',A.name) LIKE '%' ? '%' 
        GROUP BY review_id
        ORDER BY A.creationDate DESC 
        LIMIT ? OFFSET ?`,
      [json["search"], pageSize, offset]
    );

    if (res_review && res_review.length > 0) {
      let total = parseInt(res_total[0].total);
      let totalPages = Math.ceil(total / pageSize);
      res.send({
        data: res_review,
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

    if (!json['review_id']) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    const [res_review] = await db.query(`SELECT A.* 
      FROM review AS A WHERE A.review_id = ?`,[json["review_id"]]);

    if (res_review && res_review.length > 0) {
      res.send({
        data: res_review[0],
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
      const json = req.body;
      
      let service_id = "";
      if (json["service_id"]) {
        service_id = `WHERE  B.service_id = ${json["service_id"]}`;
      }

      const [res_review] = await db.query(`SELECT A.*
        ,B.name AS service_name
        ,B.duration AS service_duration
        FROM review AS A
        LEFT JOIN service AS B ON B.service_id = A.service_id 
        ${service_id}
        GROUP BY review_id
        ORDER BY A.creationDate DESC`);
      if (res_review && res_review.length > 0) {
        res.send({
          data: res_review,
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

    await db.query(`INSERT INTO review (name
        ,rating
        ,comment
        ,service_id
        ,creationDate) VALUES (?,?,?,?,NOW())`
        ,[json["customer_name"]
        ,json["review_rating"]
        ,json["review_comment"]
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


//delete
router.post('/delete', async (req, res) => {
  try {
      const json = req.body;

      if (!json['review_id']) {
        res.send({
          status: "400",
          message: "WARNING",
          detail: "No Data found",
        });
        return;
      }
      
      const [res_review] = await db.query(`SELECT * FROM review WHERE review_id = ?`, [json["review_id"]]);
    
      if (res_review && res_review.length > 0) {
        
        //ลบรูปเก่า
        await db.query(`DELETE FROM review WHERE review_id = ?`,[json["review_id"]]);

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
