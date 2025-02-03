
const express = require('express');
const router = express.Router();
const {db} = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { padCRC32, addfileBase64 } = require('../constants/constant');


if (!fs.existsSync("uploads/reviews")) {
  fs.mkdirSync("uploads/reviews");
}

//get
router.post('/get', async (req, res) => {
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

        let page = parseInt(json['page']) || 1;
        let pageSize = parseInt(json['pageSize']) || 10;
        let offset = (page - 1) * pageSize;

        const [res_total] = await db.query(`SELECT COUNT(*) AS total FROM reviews WHERE review_Name LIKE '%' ? '%'`,[json['search']]);
        const [res_review] = await db.query(`SELECT * FROM reviews WHERE review_Name LIKE '%' ? '%' LIMIT ? OFFSET ?`,[json['search'],pageSize,offset]);
          
        if (res_review) {
          
        let total = parseInt(res_total[0].total);
        let totalPage = Math.ceil(total / pageSize);

          res.send({
            data: res_review,
            totalCount: total,
            totalPage: totalPage,
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
      const [res_review] = await db.query(`SELECT * FROM reviews`);
      if (res_review) {
        res.send({
          data: res_review,
          status: "200",
          message: "SUCCESS",
          detail: "successful",
        });
        return;
      }
      res.send({
        status: "402",
        message: "WARNING",
        detail: "No Data",
      });
  
    } catch (err) {
      res.send({ status: "500", message: 'ERROR',detail:err.message });
    }
});

router.post('/get-list-category', async (req, res) => {
  try {
      const [res_review] = await db.query(`SELECT * FROM reviewcategories`);
      if (res_review) {
        res.send({
          data: res_review,
          status: "200",
          message: "SUCCESS",
          detail: "successful",
        });
        return;
      }
      res.send({
        status: "402",
        message: "WARNING",
        detail: "No Data",
      });
  
    } catch (err) {
      res.send({ status: "500", message: 'ERROR',detail:err.message });
    }
});

router.post('/getbyid', async (req, res) => {
  try {
      const json = req.body;

      if (!json['review_Id']) {
        res.send({
          status: "400",
          message: "WARNING",
          detail: "No Data found",
        });
        return;
      }

      const [res_review] = await db.query(`SELECT * FROM reviews WHERE review_Id = ?`,json['review_Id']);

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
         status: "402",
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
    let json = req.body;

    if (!json) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    const [res_member] = await db.query(`SELECT * FROM members WHERE member_Code = ?`,json['member_Code']);

    if (!res_member && !res_member.length > 0) {
      res.send({
        status: "401",
        message: "WARNING",
        detail: "No Member",
      });
      return;
    }

    if (!fs.existsSync(`uploads/reviews/${json['member_Code']}`)) {
      fs.mkdirSync(`uploads/reviews/${json['member_Code']}`);
    }

    const review_id = uuidv4();
    await db.query(`INSERT INTO reviews (review_Id
        ,review_Name
        ,review_Description
        ,review_MonthTravel
        ,review_YearTravel
        ,review_CreationDate
        ,review_IsUse
        ,member_Id
        ,review_Level
        ,reviewCategory_Id
        ,travel_Id) VALUES (?,?,?,?,?,NOW(),1,?,?,?,?)`,[review_id
        ,json["review_Name"]
        ,json["review_Description"]
        ,json["review_MonthTravel"]
        ,json["review_YearTravel"]
        ,res_member[0]["member_Id"]
        ,json["review_Level"]
        ,json["reviewCategory_Id"]
        ,json["travel_Id"]
    ]);

    const images = json['images'];
    images.forEach(async (file) => {
       const img_id = uuidv4();
       const img_code = padCRC32(img_id,"2");
       const filePath = `uploads/reviews/${json['member_Code']}/${img_code}${file.extension}`;
       await db.query(`INSERT INTO reviewimgs (reviewImg_Id,reviewImg_Code,reviewImg_Path,review_Id) VALUES (?,?,?,?)`,[img_id,img_code,filePath,review_id]);   
       addfileBase64(file,filePath)
    });
 
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

    const [res_review] = await db.query(
      `SELECT * FROM reviews WHERE review_Id = ?`,
      [json["review_Id"]]
    );

    if (res_review && res_review.length > 0) {
      await db.query(
        `UPDATE reviews SET review_Name = ?  WHERE review_Id = ?`,
        [json["review_Name"], json["review_Id"]]
      );

      res.send({
        status: "200",
        message: "SUCCESS",
        detail: "Update successful",
      });
      return;
    }

    res.send({
      status: "401",
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
      
      if (!json['review_Id']) {
        res.send({
          status: "400",
          message: "WARNING",
          detail: "No Data found",
        });
        return;
      } 

      await db.query(`DELETE FROM reviews WHERE review_Id = ?`,[json["review_Id"]]);        
      
      res.send({
          status: "200",
          message: "SUCCESS",
          detail:"successful"
      });
  
    } catch (err) {
      res.send({ status: "500", message: 'ERROR',detail:err.message });
    }
});


module.exports = router;