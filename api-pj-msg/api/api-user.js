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

    if (!json["user_Name"] || !json["user_Password"]) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    const [res_user] = await db.query(
      `
            SELECT user_Code,user_Name,role_Id,user_Status FROM users 
            WHERE user_Name = ? 
            AND user_Password = ? 
            AND user_Status = ?
            AND user_IsUse = ?`,
      [json["user_Name"], md5(json["user_Password"]).toUpperCase(), "1", "1"]
    );

    if (!res_user || !res_user[0]) {
      res.send({
        status: "404",
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

// //authen
// router.post("/authen", async (req, res) => {
//   try {
//     const json = req.body;

//     if (!json) {
//       res.send({
//         status: "400",
//         message: "WARNING",
//         detail: "No Data found",
//       });
//       return;
//     }

//     const [res_user] = await db.query(
//       `
//             SELECT user_Code,user_Name,role_Id,user_Status FROM users 
//             WHERE user_Code = ?
//             AND user_Name = ? 
//             AND role_Id = ?
//             AND user_Status = ?`,
//       [
//         json["user_Code"],
//         json["user_Name"],
//         json["role_Id"],
//         json["user_Status"],
//       ]
//     );

//     if (res_user && res_user.length > 0) {
//       res.send({
//         data: res_user[0],
//         status: "200",
//         message: "SUCCESS",
//         detail: "Authen successful",
//       });
//       return;
//     }

//     res.send({
//       status: "404",
//       message: "WARNING",
//       detail: "No Data",
//     });
//   } catch (err) {
//     res.send({ status: "500", message: "ERROR", detail: err.message });
//   }
// });

//get
// router.post("/get", async (req, res) => {
//   try {
//     const json = req.body;

//     if (!json) {
//       res.send({
//         status: "400",
//         message: "WARNING",
//         detail: "No Data found",
//       });
//       return;
//     }

//     let page = parseInt(json["page"]) || 1;
//     let pageSize = parseInt(json["pageSize"]) || 10;
//     let offset = (page - 1) * pageSize;

//     let role_Id = "";

//     if (json["role_Id"]) {
//       role_Id = `A.role_Id = '${json["role_Id"]}' AND`;
//     }

//     const query_search = `${role_Id}`;

//     const [res_total] = await db.query(`SELECT COUNT(*) AS total FROM users`);
//     const [res_user] = await db.query(
//       `
//         SELECT A.*,B.role_NameThai FROM users AS A 
//         LEFT JOIN roles AS B ON B.role_Id = A.role_Id 
//         WHERE ${query_search} A.role_Id != 1 AND CONCAT_WS(' ', A.user_Code,A.user_Name) LIKE '%' ? '%' LIMIT ? OFFSET ?`,
//       [json["search"], pageSize, offset]
//     );

//     if (res_user) {
//       let total = parseInt(res_total[0].total);
//       let totalPages = Math.ceil(total / pageSize);
//       res.send({
//         data: res_user,
//         totalCount: total,
//         totalPages: totalPages,
//         status: "200",
//         message: "SUCCESS",
//         detail: "successful",
//       });
//       return;
//     }

//     res.send({
//       status: "404",
//       message: "WARNING",
//       detail: "No Data",
//     });
//   } catch (err) {
//     res.send({ status: "500", message: "ERROR", detail: err.message });
//   }
// });

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

// //insert
// router.post("/insert", async (req, res) => {
//   try {
//     const json = req.body;

//     if (!json) {
//       res.send({
//         status: "400",
//         message: "WARNING",
//         detail: "No Data found",
//       });
//       return;
//     }

//     const userId = uuidv4();
//     const [res_user] = await db.query(
//       `SELECT * FROM users WHERE user_Name = ? AND user_IsUse = 1`,
//       [json["user_Name"]]
//     );

//     if (res_user && res_user[0]) {
//       res.send({
//         status: "404",
//         message: "WARNING",
//         detail: "Duplicate Data",
//       });
//       return;
//     }

//     await db.query(
//       `INSERT INTO users (user_Id
//             ,user_Code
//             ,user_Name
//             ,user_Password
//             ,user_Status
//             ,user_IsUse
//             ,role_Id) VALUES (?,LPAD(CRC32(?), 13, '0'),?,?,?,?,?)`,
//       [
//         userId,
//         userId,
//         json["user_Name"],
//         md5(json["user_Password"]).toUpperCase(),
//         "1",
//         "1",
//         json["role_Id"],
//       ]
//     );

//     res.send({
//       status: "200",
//       message: "SUCCESS",
//       detail: "Insert successful",
//     });
//   } catch (err) {
//     res.send({ status: "500", message: "ERROR", detail: err.message });
//   }
// });

// //update
// router.post("/update", async (req, res) => {
//   try {
//     const json = req.body;

//     if (!json) {
//       res.send({
//         status: "400",
//         message: "WARNING",
//         detail: "No Data found",
//       });
//       return;
//     }

//     const [res_user] = await db.query(`SELECT * FROM users WHERE user_Id = ?`, [
//       json["user_Id"],
//     ]);

//     if (res_user && res_user.length > 0) {
//       let pass = "";

//       if (json["user_new_password"]) {
//         let userNewPassword = md5(json["user_new_password"]).toUpperCase();
//         if (json["user_Password"] !== userNewPassword) {
//           pass = userNewPassword;
//         }
//       } else {
//         pass = json["user_Password"];
//       }

//       await db.query(
//         `
//         UPDATE users SET user_Name = ?
//         ,user_Password = ?
//         ,user_Status = ?
//         ,user_IsUse = ? WHERE user_Id`,
//         [json["user_Name"], pass, json["user_Status"], json["user_IsUse"]]
//       );

//       res.send({
//         status: "200",
//         message: "SUCCESS",
//         detail: "successful",
//       });

//       return;
//     }

//     res.send({
//       status: "404",
//       message: "WARNING",
//       detail: "No Data",
//     });
//   } catch (err) {
//     res.send({ status: "500", message: "ERROR", detail: err.message });
//   }
// });

// //delete
// router.post('/delete', async (req, res) => {
//   try {
//       const json = req.body;

//       if (!json['user_Id']) {
//         res.send({
//           status: "400",
//           message: "WARNING",
//           detail: "No Data found",
//         });
//         return;
//       }

//         await db.query(`DELETE FROM users WHERE user_Id = ?`,[json["user_Id"]]);

//         res.send({
//           status: "200",
//           message: "SUCCESS",
//           detail: "successful",
//         });
//         return

//     } catch (err) {
//       res.send({ status: "500", message: 'ERROR',detail:err.message });
//     }
// });

module.exports = router;
