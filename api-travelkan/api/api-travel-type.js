
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

        const [res_total] = await db.query(`SELECT COUNT(*) AS total FROM types WHERE type_Name LIKE '%' ? '%'`,[json['search']]);
        const [res_travelType] = await db.query(`SELECT * FROM types WHERE type_Name LIKE '%' ? '%' LIMIT ? OFFSET ?`,[json['search'],pageSize,offset]);
          
        if (res_travelType) {
          
        let total = parseInt(res_total[0].total);
        let totalPage = Math.ceil(total / pageSize);

          res.send({
            data: res_travelType,
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
      const [res_travelType] = await db.query(`SELECT * FROM types`);
      if (res_travelType) {
        res.send({
          data: res_travelType,
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

      if (!json['type_Id']) {
        res.send({
          status: "400",
          message: "WARNING",
          detail: "No Data found",
        });
        return;
      }

      const [res_travelType] = await db.query(`SELECT * FROM types WHERE type_Id = ?`,json['type_Id']);

      if (res_travelType && res_travelType.length > 0) {
        res.send({
          data: res_travelType[0],
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

      const [res_Type] = await db.query(` SELECT * FROM types WHERE type_Name = ?` ,[json["type_Name"]]);

      if(res_Type && res_Type.length > 0){
          res.send({
              status: "401",
              message: "WARNING",
              detail:"Duplicate Data"
          });
          return
      }

      await db.query(`INSERT INTO types (type_Name) VALUES (?)`, [json["type_Name"],]);

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

    const [res_CheckType] = await db.query(` SELECT * FROM types WHERE type_Name = ?` ,[json["type_Name"]]);

    if(res_CheckType && res_CheckType.length > 0){
        res.send({
            status: "401",
            message: "WARNING",
            detail:"Duplicate Data"
        });
        return
    }


    const [res_Type] = await db.query(`SELECT * FROM types WHERE type_Id = ?`,[json["type_Id"]]);

    if (res_Type && res_Type.length > 0) {
      await db.query(`UPDATE types SET type_Name = ?  WHERE type_Id = ?`, [
        json["type_Name"],
        json["type_Id"],
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
      
      if (!json['type_Id']) {
        res.send({
          status: "400",
          message: "WARNING",
          detail: "No Data found",
        });
        return;
      } 

      await db.query(`DELETE FROM types WHERE type_Id = ?`,[json["type_Id"]]);        
      
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