const express = require("express");
const router = express.Router();
var md5 = require("md5");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { db } = require("../config/db");
const { padCRC32, addfileBase64, removefile } = require("../constants/constant");

if (!fs.existsSync("uploads/staff")) {
  fs.mkdirSync("uploads/staff");
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

    const [res_total] = await db.query(`SELECT COUNT(*) AS total FROM staff`);
    const [res_staff] = await db.query(`
        SELECT * FROM staff WHERE  CONCAT_WS(' ',name) LIKE '%' ? '%' LIMIT ? OFFSET ?`,
      [json["search"], pageSize, offset]
    );

    if (res_staff) {
      let total = parseInt(res_total[0].total);
      let totalPages = Math.ceil(total / pageSize);
      res.send({
        data: res_staff,
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

// //getbyid
router.post('/getbyid', async (req, res) => {
try {
    const json = req.body;

    if (!json['staff_id']) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    const [res_staff] = await db.query(`SELECT * FROM staff WHERE staff_id = ?`,json["staff_id"]);

    if (res_staff && res_staff.length > 0) {
      res.send({
        data: res_staff[0],
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

    // const [res_staff] = await db.query(`SELECT * FROM staff WHERE name = ?`,[json["staff_name"]]);

    // if (res_staff && res_staff[0]) {
    //   res.send({
    //     status: "404",
    //     message: "WARNING",
    //     detail: "Duplicate Data",
    //   });
    //   return;
    // }

    const staff_Id = uuidv4();
    const staff_code = padCRC32(staff_Id).toString()
    let filePath = "";
 
    if (json["staff_img"]) {
      filePath = addfileBase64(json["staff_img"],`uploads/staff/${staff_code}`);
    }
 
    await db.query(`INSERT INTO staff (staff_code,name,phone,image_url) VALUES (?,?,?,?)`,[staff_code,json["staff_name"],json["staff_phone"],filePath ? filePath : ""]);
       
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

    const [res_staff] = await db.query(`SELECT * FROM staff WHERE staff_id = ?`, [json["staff_id"]]);

    if (res_staff && res_staff.length > 0) {
      const staff = res_staff[0]
      let imgUrl = staff.image_url
      if (json["staff_img"]) {
        imgUrl = addfileBase64(json["staff_img"],`uploads/staff/${staff.staff_code}`);
        if (staff.image_url !== imgUrl) {
          removefile(staff.image_url);
        }
      }

      await db.query(`UPDATE staff SET name = ?,phone = ?,image_url = ? WHERE staff_id = ?`,
        [json["staff_name"], json["staff_phone"], imgUrl, json["staff_id"]]
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

      if (!json['staff_id']) {
        res.send({
          status: "400",
          message: "WARNING",
          detail: "No Data found",
        });
        return;
      }
      const [res_staff] = await db.query(`SELECT * FROM staff WHERE staff_id = ?`, [json["staff_id"]]);

      if (res_staff && res_staff.length > 0) {
        const staff = res_staff[0]
        removefile(staff.image_url);
        await db.query(`DELETE FROM staff WHERE staff_id = ?`,[staff.staff_id]);

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
