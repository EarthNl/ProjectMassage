
const express = require('express');
const router = express.Router();
const {db} = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const crc = require('crc');
var md5 = require("md5");
const fs = require("fs");
const { addfileBase64, removefile } = require('../constants/constant');

if (!fs.existsSync("uploads/members")) {
  fs.mkdirSync("uploads/members");
}

//login
router.post("/login", async (req, res) => {
  try {
    const json = req.body;
    if (!json["member_Username"] || !json["member_Password"]) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    const [res_member] = await db.query(`SELECT member_Code,member_Username,member_Status,member_Profile
      FROM members 
      WHERE member_Username = ? AND member_Password = ? AND member_Status = ? AND member_IsUse = ?`,
      [json["member_Username"], md5(json["member_Password"]).toUpperCase(), "1", "1"]
    );

    if (!res_member || !res_member[0]) {
      res.send({
        status: "404",
        message: "WARNING",
        detail: "Login error",
      });
      return;
    }

    res.send({
      data: res_member[0],
      status: "200",
      message: "SUCCESS",
      detail: "Login successful",
    });
  } catch (err) {
    res.send({ status: "500", message: "ERROR", detail: err.message });
  }
});

//login
router.post("/authorization", async (req, res) => {
  try {
    const json = req.body;

    if (!json['code']) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    const [res_member] = await db.query(`SELECT member_Code,member_Username,member_Name,member_Profile FROM members   WHERE member_Code = ?`,json['code']);

    if (res_member && res_member.length > 0) {
      res.send({
        data:res_member[0],
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

//register
router.post("/register", async (req, res) => {
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
    const member_Id = uuidv4();
    const member_code = padCRC32(member_Id).toString()

    const [res_member] = await db.query(`SELECT * FROM members WHERE member_Username = ? OR member_Email = ? AND member_IsUse = 1`,[json["member_Username"],json["member_Email"]]);
  
      if (res_member && res_member[0]) {
        res.send({
          status: "401",
          message: "WARNING",
          detail: "Duplicate Data",
        });
        return;
      }

    await db.query(
      `INSERT INTO members (member_Id
        ,member_Code
        ,member_Name
        ,member_Username
        ,member_Password
        ,member_Email
        ,member_CreationDate
        ,member_Status
        ,member_IsUse) VALUES (?,?,?,?,?,?,NOW(),1,1)`,
      [
        member_Id,
        member_code,
        json["member_Name"],
        json["member_Username"],
        md5(json["member_Password"]),
        json["member_Email"],
        json["member_Status"],
        json["member_IsUse"],
      ]
    );

    if (!fs.existsSync(`uploads/members/${member_code}`)) {
      fs.mkdirSync(`uploads/members/${member_code}`);
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

//get
router.post('/get', async (req, res) => {
    try {
        const json = req.body;
        if (!json || !json['page'] || !json['pageSize']) {
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

        const [res_total] = await db.query(`SELECT COUNT(*) AS total FROM members WHERE member_Name LIKE '%' ? '%'`,[json['search']]);
        const [res_member] = await db.query(`SELECT * FROM members WHERE member_Name LIKE '%' ? '%' LIMIT ? OFFSET ?`,[json['search'],pageSize,offset]);
          
        if (res_member) {
          
        let total = parseInt(res_total[0].total);
        let totalPage = Math.ceil(total / pageSize);

          res.send({
            data: res_member,
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

//getlist
router.post('/get-list', async (req, res) => {
  try {
      const [res_member] = await db.query(`SELECT * FROM members`);
      if (res_member) {
        res.send({
          data: res_member,
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

//getbyid
router.post('/getbyid', async (req, res) => {
  try {
      const json = req.body;

      if (!json['member_Id']) {
        res.send({
          status: "400",
          message: "WARNING",
          detail: "No Data found",
        });
        return;
      }

      const [res_member] = await db.query(`SELECT A.*
      ,B.province_NameThai
      ,C.amphur_NameThai
      ,D.tambon_NameThai  
      FROM members AS A 
      LEFT JOIN provinces AS B ON B.province_Id = A.province_Id
      LEFT JOIN amphures  AS C ON C.amphur_Id   = A.amphur_Id
      LEFT JOIN tambons   AS D ON D.tambon_Id   = A.tambon_Id WHERE member_Id = ?`,json['member_Id']);

      if (res_member && res_member.length > 0) {
        const resMem = res_member[0]
        let sumAddress = ""
        if (resMem.province_Id) {
          sumAddress = `จังหวัด ${resMem.province_NameThai}`;
          if (resMem.amphur_Id) {
            sumAddress = `อำเภอ ${resMem.amphur_NameThai} จังหวัด ${resMem.province_NameThai} `;
            if (resMem.tambon_Id) {
              sumAddress = `ตำบล ${resMem.tambon_NameThai} อำเภอ ${resMem.amphur_NameThai} จังหวัด ${resMem.province_NameThai} `;
            }
          }
        }
        res.send({
          data: {...res_member[0],sumAddress:sumAddress},
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

//getbycode
router.post('/getbycode', async (req, res) => {
  try {
      const json = req.body;

      if (!json['member_Code']) {
        res.send({
          status: "400",
          message: "WARNING",
          detail: "No Data found",
        });
        return;
      }

      const [res_member] = await db.query(`SELECT A.*
        ,B.province_NameThai
        ,C.amphur_NameThai
        ,D.tambon_NameThai 
        ,(SELECT COUNT(*) FROM reviews WHERE member_Id = A.member_Id) AS count_review
        FROM members AS A 
        LEFT JOIN provinces AS B ON B.province_Id = A.province_Id
        LEFT JOIN amphures  AS C ON C.amphur_Id   = A.amphur_Id
        LEFT JOIN tambons   AS D ON D.tambon_Id   = A.tambon_Id WHERE member_Code = ?`,json['member_Code']);
  
        if (res_member && res_member.length > 0) {
          const resMem = res_member[0]
          let sumAddress = ""
          if (resMem.province_Id) {
            sumAddress = `จังหวัด ${resMem.province_NameThai}`;
            if (resMem.amphur_Id) {
              sumAddress = `อำเภอ ${resMem.amphur_NameThai} จังหวัด ${resMem.province_NameThai} `;
              if (resMem.tambon_Id) {
                sumAddress = `ตำบล ${resMem.tambon_NameThai} อำเภอ ${resMem.amphur_NameThai} จังหวัด ${resMem.province_NameThai} `;
              }
            }
          }
          res.send({
            data: {...res_member[0],sumAddress:sumAddress},
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

    const [res_member] = await db.query(`SELECT * FROM members WHERE member_Id = ?`,[json["member_Id"]]);

    if (res_member && res_member.length > 0) {
      await db.query(
        `UPDATE members SET member_Name = ?
        ,member_Abount = ?
        ,member_Phone = ?
        ,member_Email = ?
        ,member_Website = ?
        ,member_Sex = ?
        ,tambon_Id = ?
        ,amphur_Id = ?
        ,province_Id = ?
        WHERE member_Id = ?`,
        [json["member_Name"]
        ,json['member_Abount']
        ,json['member_Phone']
        ,json['member_Email']
        ,json['member_Website']
        ,json['member_Sex']
        ,json['tambon_Id']
        ,json['amphur_Id']
        ,json['province_Id']
        ,json["member_Id"]]
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

router.post("/update-password", async (req, res) => {
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

   

    const [res_member] = await db.query(`SELECT * FROM members WHERE member_Id = ? AND member_Password = ?`,[json["member_Id"],md5(json["member_Password"])]);

    if (res_member && res_member.length > 0) {
      await db.query(
        `UPDATE members SET member_Password = ?
        WHERE member_Id = ?`,
        [md5(json["member_NewPassword"]), json["member_Id"]]
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

router.post("/update-img", async (req, res) => {
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

    const [res_member] = await db.query(`SELECT * FROM members WHERE member_Id = ?`,[json["member_Id"]]);

    if (res_member && res_member.length > 0) {
      const formFile = json["formFile"];
      if (json["img_AB"] === "BG") {
        const filePath = `uploads/members/${json["member_Code"]}/${json["img_AB"]}${json["member_Code"]}${formFile.extension}`;
        await db.query(
          `UPDATE members SET member_Background =  ? WHERE member_Id = ? `,
          [filePath, json["member_Id"]]
        );
        addfileBase64(formFile, filePath);
      } else if (json["img_AB"] === "PF") {
        const filePath = `uploads/members/${json["member_Code"]}/${json["img_AB"]}${json["member_Code"]}${formFile.extension}`;
        await db.query(
          `UPDATE members SET member_Profile =  ? WHERE member_Id = ? `,
          [filePath, json["member_Id"]]
        );
        addfileBase64(formFile, filePath);
      }

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

//delete-img

router.post('/delete-img', async (req, res) => {
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

    const [res_member] = await db.query(`SELECT * FROM members WHERE member_Id = ?`,[json["member_Id"]]);
    if (res_member && res_member.length > 0) {
      const member = res_member[0]
      if (json["img_AB"] === "BG") {
        await db.query(
          `UPDATE members SET member_Background =  ? WHERE member_Id = ? `,
          [null, json["member_Id"]]
        );
        removefile(member.member_Background);
      } else if (json["img_AB"] === "PF") {
        await db.query(
          `UPDATE members SET member_Profile =  ? WHERE member_Id = ? `,
          [null, json["member_Id"]]
        );
        removefile(member.member_Profile);
      }

      res.send({
        status: "200",
        message: "SUCCESS",
        detail: "Delete successful",
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
      if (!json['member_Id']) {
        res.send({
          status: "400",
          message: "WARNING",
          detail: "No Data found",
        });
        return;
      } 

      await db.query(`DELETE FROM members WHERE member_Id = ?`,[json["member_Id"]]);        
      
      res.send({
          status: "200",
          message: "SUCCESS",
          detail:"successful"
      });
  
    } catch (err) {
      res.send({ status: "500", message: 'ERROR',detail:err.message });
    }
});


function padCRC32(input) {
    // Compute the CRC32 checksum
    const checksum = crc.crc32(input).toString(10); // Convert to base 10
    // Pad the checksum to 13 characters with leading zeros
    return checksum.padStart(13, "1");
}

module.exports = router;