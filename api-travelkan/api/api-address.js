const express = require('express');
const router = express.Router();
const {db} = require("../config/db");

//search
router.post('/search', async (req, res) => {
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

        const [res_Address] = await db.query(`
            SELECT
            A.tambon_NameThai 
            ,B.amphur_NameThai
            ,C.province_NameThai
            ,D.geography_NameThai
            FROM tambons AS A
            LEFT JOIN amphures    AS B ON B.amphur_Id    = A.amphur_Id
            LEFT JOIN provinces   AS C ON C.province_Id  = B.province_Id
            LEFT JOIN geographies AS D ON D.geography_Id = C.geography_Id
            WHERE CONCAT_WS(' ',A.tambon_NameThai,B.amphur_NameThai,C.province_NameThai,D.geography_NameThai)  LIKE '%' ? '%' LIMIT ? `,[json['search'],20]);
          
        if (res_Address) {
          res.send({
            data: res_Address,
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

//search
router.post('/get-tambon', async (req, res) => {
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

        const [res_Address] = await db.query(`
            SELECT 
            tambon_Id 
            ,tambon_NameThai 
            FROM tambons 
            WHERE amphur_Id = ${json['amphur_Id']} 
            AND tambon_NameThai  LIKE '%' ? '%'`,[json['search']]);
          
        if (res_Address) {
          res.send({
            data: res_Address,
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

//search
router.post('/get-amphur', async (req, res) => {
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

        const [res_Address] = await db.query(`
            SELECT 
            amphur_Id 
            ,amphur_NameThai 
            FROM amphures 
            WHERE province_Id = ${json['province_Id']} 
            AND amphur_NameThai  LIKE '%' ? '%'`,[json['search']]);
          
        if (res_Address) {
          res.send({
            data: res_Address,
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

//search
router.post('/get-province', async (req, res) => {
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

        // const [res_Address] = await db.query(`
        //     SELECT 
        //     province_Id 
        //     ,province_NameThai 
        //     FROM provinces 
        //     WHERE geography_Id = ${json['geography_Id']} 
        //     AND province_NameThai  LIKE '%' ? '%'`,[json['search']]);
        const [res_Address] = await db.query(`
                SELECT 
                province_Id 
                ,province_NameThai 
                FROM provinces 
                WHERE province_NameThai  LIKE '%' ? '%'`,[json['search']]);
              
        if (res_Address) {
          res.send({
            data: res_Address,
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

//search
router.post('/get-geography', async (req, res) => {
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

        const [res_Address] = await db.query(`
            SELECT 
            geography_Id 
            ,geography_NameThai 
            FROM geographies 
            WHERE geography_NameThai  LIKE '%' ? '%'`,[json['search']]);
          
        if (res_Address) {
          res.send({
            data: res_Address,
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


module.exports = router;