
const express = require('express');
const router = express.Router();
const {db} = require("../config/db");

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

        const [res_total] = await db.query(`SELECT COUNT(*) AS total FROM activities WHERE activity_Name LIKE '%' ? '%'`,[json['search']]);
        const [res_Activity] = await db.query(`SELECT * FROM activities WHERE activity_Name LIKE '%' ? '%' LIMIT ? OFFSET ?`,[json['search'],pageSize,offset]);
          
        if (res_Activity) {
          
        let total = parseInt(res_total[0].total);
        let totalPage = Math.ceil(total / pageSize);

          res.send({
            data: res_Activity,
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
      const [res_Activity] = await db.query(`SELECT * FROM activities`);
      if (res_Activity) {
        res.send({
          data: res_Activity,
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

      if (!json['activity_Id']) {
        res.send({
          status: "400",
          message: "WARNING",
          detail: "No Data found",
        });
        return;
      }

      const [res_Activity] = await db.query(`SELECT * FROM activities WHERE activity_Id = ?`,json['activity_Id']);

      if (res_Activity && res_Activity.length > 0) {
        res.send({
          data: res_Activity[0],
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
router.post('/insert', async (req, res) => {

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

      const [res_Activity] = await db.query(` SELECT * FROM activities WHERE activity_Name = ?` ,[json["activity_Name"]]);

      if(res_Activity && res_Activity.length > 0){
          res.send({
              status: "401",
              message: "WARNING",
              detail:"Duplicate Data"
          });
          return
      }

      await db.query(`INSERT INTO activities (activity_Name) VALUES (?)`, [json["activity_Name"],]);

      res.send({
        status: "200",
        message: "SUCCESS",
        detail: "Insert successful",
      });
    
      } catch (err) {
        res.send({ status: "500", message: 'ERROR',detail:err.message });
      }
});

//update
router.post('/update', async (req, res) => {
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

    const [res_CheckType] = await db.query(` SELECT * FROM activities WHERE activity_Name = ?` ,[json["activity_Name"]]);

    if(res_CheckType && res_CheckType.length > 0){
        res.send({
            status: "401",
            message: "WARNING",
            detail:"Duplicate Data"
        });
        return
    }


    const [res_Activity] = await db.query(`SELECT * FROM activities WHERE activity_Id = ?`,[json["activity_Id"]]);

    if (res_Activity && res_Activity.length > 0) {
      await db.query(`UPDATE activities SET activity_Name = ?  WHERE activity_Id = ?`, [
        json["activity_Name"],
        json["activity_Id"],
      ]);

      res.send({
        status: "200",
        message: "SUCCESS",
        detail: "Update successful",
      });
      return;
    }

    res.send({
      status: "402",
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
      
      if (!json['activity_Id']) {
        res.send({
          status: "400",
          message: "WARNING",
          detail: "No Data found",
        });
        return;
      } 

      await db.query(`DELETE FROM activities WHERE activity_Id = ?`,[json["activity_Id"]]);        
      
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