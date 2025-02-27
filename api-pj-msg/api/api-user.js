const express = require("express");
const router = express.Router();
var md5 = require("md5");
const { v4: uuidv4 } = require("uuid");
const { db } = require("../config/db");
const crc = require('crc');

//login
router.post("/login", async (req, res) => {
  try {
    const json = req.body;

    if (!json["user_email"] || !json["user_pass"]) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    const [res_user] = await db.query(`
            SELECT 
            user_id
            ,name AS user_name
            ,role AS user_role
            ,phone AS user_phone
            FROM user 
            WHERE email = ? 
            AND password = ?`,
      [json["user_email"], md5(json["user_pass"])]
    );

    if (!res_user || !res_user[0]) {
      res.send({
        status: "401",
        message: "WARNING",
        detail: "Login error",
      });
      return;
    }

    res.send({
      data: res_user[0],
      status: "200",
      message: "SUCCESS",
      detail: "Login successful",
    });
  } catch (err) {
    res.send({ status: "500", message: "ERROR", detail: err.message });
  }
});

//authen
router.post("/authen", async (req, res) => {
  try {
    const json = req.body;

    if (!json["user_name"] || !json["user_role"]) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    const [res_user] = await db.query(`
      SELECT 
      user_id
      ,name AS user_name
      ,role AS user_role
      ,phone AS user_phone
      ,email AS user_email
      FROM user 
      WHERE name = ? AND role = ?`,
      [json["user_name"],json["user_role"]]
    );

    if (res_user && res_user.length > 0) {
      res.send({
        data: res_user[0],
        status: "200",
        message: "SUCCESS",
        detail: "Authen successful",
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

    let user_role = "";

    if (json["user_role"]) {
      user_role = `role = '${json["user_role"]}' AND`;
    }

    const query_search = `${user_role}`;

    const [res_total] = await db.query(`SELECT COUNT(*) AS total FROM user`);
    const [res_user] = await db.query(`
        SELECT * FROM user WHERE ${query_search} CONCAT_WS(' ',name) LIKE '%' ? '%' LIMIT ? OFFSET ?`,
      [json["search"], pageSize, offset]
    );

    if (res_user) {
      let total = parseInt(res_total[0].total);
      let totalPages = Math.ceil(total / pageSize);
      res.send({
        data: res_user,
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

    if (!json['user_id']) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    const [res_user] = await db.query(`SELECT * FROM user WHERE user_id = ?`,json["user_id"]);

    if (res_user && res_user.length > 0) {
      res.send({
        data: res_user[0],
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

    const [res_user] = await db.query(`SELECT * FROM user WHERE email = ?`,[json["user_email"]]);

    if (res_user && res_user[0]) {
      res.send({
        status: "404",
        message: "WARNING",
        detail: "Duplicate Data",
      });
      return;
    }

    await db.query(`INSERT INTO user (name,password,email,phone,role) VALUES (?,?,?,?,?)`
      ,[json["user_name"],md5(json["user_pass"]),json["user_email"],json["user_phone"],json["user_role"]]);

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

    const [res_user] = await db.query(`SELECT * FROM user WHERE user_id = ?`, [json["user_id"]]);

    if (res_user && res_user.length > 0) {
      let pass = "";

      if (json["user_new_pass"]) {
        let userNewPass = md5(json["user_new_pass"]).toLowerCase()
        if (json["user_pass"] !== userNewPass) {
          pass = userNewPass;
        }
      } else {
        pass = res_user[0].password
      }

      await db.query(
        `
        UPDATE user SET name = ?
        ,password = ?
        ,email = ?
        ,phone = ? 
        ,role = ? WHERE user_id = ?`,
        [json["user_name"], pass, json["user_email"],json["user_phone"],json["user_role"],json["user_id"]]
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

      if (!json['user_id']) {
        res.send({
          status: "400",
          message: "WARNING",
          detail: "No Data found",
        });
        return;
      }

        await db.query(`DELETE FROM user WHERE user_id = ?`,[json["user_id"]]);

        res.send({
          status: "200",
          message: "SUCCESS",
          detail: "successful",
        });
        return

    } catch (err) {
      res.send({ status: "500", message: 'ERROR',detail:err.message });
    }
});

module.exports = router;
