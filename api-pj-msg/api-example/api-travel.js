const express = require("express");
const router = express.Router();
const { db } = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const crc = require('crc');
const fs = require("fs");

const { removefile, addfileBase64 } = require("../constants/constant");

if (!fs.existsSync("uploads/travels")) {
  fs.mkdirSync("uploads/travels");
}

//search
router.post("/search", async (req, res) => {
  try {

    const json = req.body;

    const [res_travel] = await db.query(`
      SELECT 
       A.travel_Id
      ,A.travel_Code
      ,A.travel_Name 
      ,B.travelImg_Path
      ,D.type_Name
      ,F.activity_Name
      FROM travels A
      LEFT JOIN travelimgs       AS B ON B.travel_Id   = A.travel_Id
      LEFT JOIN traveltypes      AS C ON C.travel_Id   = A.travel_Id
      LEFT JOIN types            AS D ON D.type_Id     = C.type_Id
      LEFT JOIN travelactivities AS E ON E.travel_Id   = A.travel_Id
      LEFT JOIN activities       AS F ON F.activity_Id = E.activity_Id
      WHERE travel_Name LIKE '%' ? '%' 
      GROUP BY A.travel_Code
      ORDER BY travel_CreationDate DESC LIMIT ?`,
      [json["search"],10]
    );

    if (res_travel && res_travel.length > 0) {
      res.send({
        data: res_travel,
        status: "200",
        message: "SUCCESS",
        detail: "successful",
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

    if (!json || !json['page'] || !json['pageSize']) {
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
    const [res_total] = await db.query(`SELECT COUNT(*) AS total FROM travels WHERE travel_Name LIKE '%' ? '%'`,
      [json["search"]]
    );

    const [res_Travel] = await db.query(`
      SELECT A.*
      ,C.type_Id
      ,C.type_Name
      ,E.activity_Id
      ,E.activity_Name
      ,F.travelImg_Path
      ,(SELECT COUNT(*) FROM reviews WHERE travel_Id = A.travel_Id) AS count_review
      ,(SELECT AVG(review_Level) FROM reviews WHERE travel_Id = A.travel_Id) AS count_rating
      FROM travels AS A 
      LEFT JOIN traveltypes       AS B ON B.travel_Id   = A.travel_Id 
      LEFT JOIN types             AS C ON C.type_Id     = B.type_Id 
      LEFT JOIN travelactivities  AS D ON D.travel_Id   = A.travel_Id
      LEFT JOIN activities        AS E ON E.activity_Id = D.activity_Id
      LEFT JOIN travelimgs        AS F ON F.travel_Id   = A.travel_Id
      WHERE A.travel_Name LIKE '%' ? '%'
      ${json["type_Id"] && ` AND C.type_Id = ${json["type_Id"]} `}
      ${json["activity_Id"]&& ` AND E.activity_Id = ${json["activity_Id"]} `}
      GROUP BY A.travel_Code
      ORDER BY (SELECT AVG(review_Level) FROM reviews WHERE travel_Id = A.travel_Id) DESC LIMIT ? OFFSET ?`,
      [json["search"], pageSize, offset]
    );

    if (res_Travel) {
      let total = parseInt(res_total[0].total);
      let totalPage = Math.ceil(total / pageSize);
      res.send({
        data: res_Travel,
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
    res.send({ status: "500", message: "ERROR", detail: err.message });
  }
});

//getlist
router.post("/get-list", async (req, res) => {
  try {
    const [res_Travel] = await db.query(`SELECT * FROM travels`);
    if (res_Travel) {
      res.send({
        data: res_Travel,
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
    res.send({ status: "500", message: "ERROR", detail: err.message });
  }
});

//getbyid
router.post("/getbyid", async (req, res) => {
  try {
    const json = req.body;

    if (!json["travel_Id"]) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    const [res_travel] = await db.query(
      `SELECT A.*
      ,(SELECT COUNT(*) FROM reviewimgs AS RVI
      LEFT JOIN reviews AS RVW ON RVW.review_Id = RVI.review_Id
      WHERE RVW.travel_Id = A.travel_Id) AS count_img
      ,(SELECT COUNT(*) FROM reviews WHERE review_Level = 1 AND travel_Id = A.travel_Id) AS level_One
      ,(SELECT COUNT(*) FROM reviews WHERE review_Level = 2 AND travel_Id = A.travel_Id) AS level_Two
      ,(SELECT COUNT(*) FROM reviews WHERE review_Level = 3 AND travel_Id = A.travel_Id) AS level_Three
      ,(SELECT COUNT(*) FROM reviews WHERE review_Level = 4 AND travel_Id = A.travel_Id) AS level_Four
      ,(SELECT COUNT(*) FROM reviews WHERE review_Level = 5 AND travel_Id = A.travel_Id) AS level_Five
      ,CONCAT(A.travel_Address," ",D.tambon_NameThai ," ",C.amphur_NameThai," ",B.province_NameThai) AS sumAddress
      ,B.province_NameThai
      ,C.amphur_NameThai
      ,D.tambon_NameThai 
      FROM travels AS A 
      LEFT JOIN provinces AS B ON B.province_Id = A.province_Id
      LEFT JOIN amphures  AS C ON C.amphur_Id   = A.amphur_Id
      LEFT JOIN tambons   AS D ON D.tambon_Id   = A.tambon_Id
      WHERE  A.travel_Id = ?`,
      json["travel_Id"]
    );

    if (res_travel && res_travel.length > 0) {
      res.send({
        data: res_travel[0],
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
    res.send({ status: "500", message: "ERROR", detail: err.message });
  }
});

//getbyid to type
router.post("/getbyid-to-type", async (req, res) => {
  try {
    const json = req.body;

    if (!json["travel_Id"]) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    const [res_travel] = await db.query(`SELECT A.travelType_Id,B.* FROM traveltypes AS A LEFT JOIN types AS B ON B.type_Id = A.type_Id WHERE  A.travel_Id = ?`,json["travel_Id"]);

    if (res_travel && res_travel.length > 0) {
      res.send({
        data: res_travel,
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
    res.send({ status: "500", message: "ERROR", detail: err.message });
  }
});

//travel activity
//get viral 
router.post('/get-viral-activity', async (req, res) => {
  try {

    // const [res_activity] = await db.query(
    //   `SELECT A.*
    //   ,COUNT(B.activity_Id = A.activity_Id) AS count_activity 
    //   ,GROUP_CONCAT(C.travelImg_Path) AS image_list
    //   FROM activities AS A 
    //   LEFT JOIN travelactivities  AS B ON B.activity_Id = A.activity_Id
    //   LEFT JOIN (SELECT * FROM travelimgs LIMIT 1) AS C ON C.travel_Id = B.travel_Id
    //   GROUP BY A.activity_Id,A.activity_Name 
    //   ORDER BY count_activity DESC
    //   `
    // );
    
    const [res_activity] = await db.query(
      `SELECT A.*
      ,C.activity_Name
      ,(SELECT COUNT(*) FROM reviews WHERE travel_Id = A.travel_Id) AS count_review
      ,(SELECT AVG(review_Level) FROM reviews WHERE travel_Id = A.travel_Id) AS count_rating
      ,D.travelImg_Path
      FROM travels AS A 
      LEFT JOIN travelactivities  AS B ON B.travel_Id   = A.travel_Id
      LEFT JOIN activities        AS C ON C.activity_Id = B.activity_Id
      LEFT JOIN travelimgs        AS D ON D.travel_Id   = A.travel_Id
      GROUP BY A.travel_Code
      ORDER BY count_rating DESC  LIMIT 6
      `
    );

    if (res_activity) {
      res.send({
        data: res_activity,
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
    res.send({ status: "500", message: "ERROR", detail: err.message });
  }
});

//getbyid to activity
router.post("/getbyid-to-activity", async (req, res) => {
  try {
    const json = req.body;

    if (!json["travel_Id"]) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    const [res_travel] = await db.query(`SELECT A.travelActivity_Id,B.* FROM travelactivities AS A LEFT JOIN activities  AS B ON B.activity_Id = A.activity_Id WHERE  A.travel_Id = ?`,json["travel_Id"]);

    if (res_travel && res_travel.length > 0) {
      res.send({
        data: res_travel,
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
    res.send({ status: "500", message: "ERROR", detail: err.message });
  }
});

//getbyid to image
router.post("/getbyid-to-img", async (req, res) => {
  try {
    const json = req.body;

    if (!json["travel_Id"]) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    const [res_travel] = await db.query(`SELECT * FROM travelimgs  WHERE travel_Id = ?`,json["travel_Id"]);

    if (res_travel && res_travel.length > 0) {
      res.send({
        data: res_travel,
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
    res.send({ status: "500", message: "ERROR", detail: err.message });
  }
});

//to review
router.post('/getbyid-to-review', async (req, res) => {
  try {
      const json = req.body;

      if (!json['travel_Id'] || !json['page'] || !json['pageSize']) {
        res.send({
          status: "400",
          message: "WARNING",
          detail: "No Data found",
        });
        return;
      }

      let page = parseInt(json['page'])
      let pageSize = parseInt(json['pageSize'])
      let offset = (page - 1) * pageSize;

      const [res_total] = await db.query(`SELECT COUNT(*) AS total FROM reviews WHERE travel_Id = ?`,[json['travel_Id']]);
      const [res_review] = await db.query(`SELECT A.*
        ,B.member_Code
        ,B.member_Name
        ,B.member_Profile
        ,(SELECT COUNT(*) FROM reviews WHERE member_Id = A.member_Id AND travel_Id = A.travel_Id) AS review_CountMember
        ,C.reviewImg_Path FROM reviews AS A
        LEFT JOIN members    AS B ON B.member_Id = A.member_Id
        LEFT JOIN reviewimgs AS C ON C.review_Id = A.review_Id
        WHERE A.travel_Id = ? 
        ORDER BY A.review_CreationDate DESC
        LIMIT ? OFFSET ?`,[json['travel_Id'],pageSize,offset]);

      if (res_review && res_review.length > 0) {
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
         status: "401",
         message: "WARNING",
         detail: "No Data",
       });
  
    } catch (err) {
      res.send({ status: "500", message: 'ERROR',detail:err.message });
    }
});

//to review img
router.post("/getbyid-to-review-img", async (req, res) => {
  try {
    const json = req.body;
    if (!json["travel_Id"]) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    const [res_travel] = await db.query(`SELECT 
      B.review_MonthTravel
      ,B.review_YearTravel
      ,C.member_Name
      ,C.member_Profile
      ,A.* FROM reviewimgs  A
      LEFT JOIN reviews AS B ON B.review_Id = A.review_Id
      LEFT JOIN members AS C ON C.member_Id = B.member_Id
      WHERE B.travel_Id = ?`,json["travel_Id"]);

    if (res_travel && res_travel.length > 0) {
      res.send({
        data: res_travel,
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
    res.send({ status: "500", message: "ERROR", detail: err.message });
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

    const travel_id = uuidv4();
    const travel_code = padCRC32(travel_id);

   await db.query(
     `INSERT INTO travels (travel_Id
     ,travel_Code
     ,travel_Name
     ,travel_Website
     ,travel_Phone
     ,travel_Detail
     ,travel_CreationDate
     ,travel_Date
     ,travel_TimeStart
     ,travel_TimeEnd
     ,travel_Latitude
     ,travel_Longitude
     ,travel_Status
     ,travel_IsUse
     ,travel_Address
     ,tambon_Id
     ,amphur_Id
     ,province_Id
     ,geography_Id
     ,user_Code) 
      VALUES (?,?,?,?,?,?,NOW(),?,?,?,?,?,?,?,?,?,?,?,?,?)`,
     [travel_id
      ,travel_code
      ,json["travel_Name"]
      ,json["travel_Website"]
      ,json["travel_Phone"]
      ,json["travel_Detail"]
      ,json["travel_Date"]
      ,json["travel_TimeStart"]
      ,json["travel_TimeEnd"]
      ,json["travel_Latitude"]
      ,json["travel_Longitude"]
      ,json["travel_Status"]
      ,json["travel_IsUse"]
      ,json["travel_Address"]
      ,json["tambon_Id"]
      ,json["amphur_Id"]
      ,json["province_Id"]
      ,json["geography_Id"]
      ,json['user_Code']
    ]
   );

   const types = json["types"];
   types.forEach(async (item) => {
    const travel_type_id = uuidv4();
    await db.query(`INSERT INTO traveltypes (travelType_Id,travel_Id,type_Id) VALUES (?,?,?)`,[travel_type_id,travel_id,item.type_Id]);
   });

   const activities = json['activities'] 
   activities.forEach(async (item) => {
    const travel_activity_id = uuidv4();
    await db.query(`INSERT INTO travelactivities (travelActivity_Id,travel_Id,activity_Id) VALUES (?,?,?)`,[travel_activity_id,travel_id,item.activity_Id]);
   });

   const images = json['images'];
   images.forEach(async (file) => {
      const travel_img_id = uuidv4();
      const travel_img_code = padCRC32(travel_img_id);
      const filePath = `uploads/travels/${travel_code}_${travel_img_code}${file.extension}`;
      await db.query(`INSERT INTO travelimgs (travelImg_Id,travelImg_Code,travelImg_Path,travel_Id) VALUES (?,?,?,?)`,[travel_img_id,travel_img_code,filePath,travel_id]);   
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
router.post("/update",async (req, res) => {
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

    await db.query(`UPDATE travels SET travel_Name = ?
      ,travel_Website = ?
      ,travel_Phone = ?
      ,travel_Detail = ?
      ,travel_Date = ?
      ,travel_TimeStart = ?
      ,travel_TimeEnd = ?
      ,travel_Latitude = ?
      ,travel_Longitude = ?
      ,travel_Status = ?
      ,travel_Address = ?
      ,tambon_Id = ?
      ,amphur_Id = ?
      ,province_Id = ?
      ,geography_Id = ? 
     WHERE travel_Id = ?`,
      [json["travel_Name"],
        json["travel_Website"],
        json["travel_Phone"],
        json["travel_Detail"],
        json["travel_Date"],
        json["travel_TimeStart"],
        json["travel_TimeEnd"],
        json["travel_Latitude"],
        json["travel_Longitude"],
        json["travel_Status"],
        json["travel_Address"],
        json["tambon_Id"],
        json["amphur_Id"],
        json["province_Id"],
        json["geography_Id"],
        json["travel_Id"],
      ]
    );
    
    const types = json["types"];
    types.forEach(async (item) => {
      if (item.travelType_Id && item.check === false) {
        await db.query(
          `DELETE FROM traveltypes WHERE travelType_Id = '${item.travelType_Id}'`
        );
      } else if (item.travelType_Id === "" && item.check === true) {
        const travel_type_id = uuidv4();
        await db.query(
          `INSERT INTO traveltypes (travelType_Id,travel_Id,type_Id) VALUES(?,?,?)`,
          [travel_type_id, json["travel_Id"], item.type_Id]
        );
      }
    });

    const activities = json["activities"];
    activities.forEach(async (item) => {
      if (item.travelActivity_Id && item.check === false) {
        await db.query(
          `DELETE FROM travelactivities WHERE travelActivity_Id = '${item.travelActivity_Id}'`
        );
      } else if (item.travelActivity_Id === "" && item.check === true) {
        const travel_activity_id = uuidv4();
        await db.query(
          `INSERT INTO travelactivities (travelActivity_Id,travel_Id,activity_Id) VALUES(?,?,?)`,
          [travel_activity_id, json["travel_Id"], item.activity_Id]
        );
      }
    });

    const images = json['images'];
      images.forEach(async (file) => {
        const travel_img_id = uuidv4();
        const travel_img_code = padCRC32(travel_img_id);
        const filePath = `uploads/travels/${json['travel_Code']}_${travel_img_code}${file.extension}`;
        await db.query(`INSERT INTO travelimgs (travelImg_Id,travelImg_Code,travelImg_Path,travel_Id) VALUES (?,?,?,?)`,[travel_img_id,travel_img_code,filePath,json['travel_Id']]);   
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
router.post("/update-isuse", async (req, res) => {
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

    const [res_Travel] = await db.query(`SELECT * FROM travels WHERE travel_Id = ?`,[json["travel_Id"]]);

    if (res_Travel && res_Travel.length > 0) {
      await db.query(`UPDATE travels SET travel_IsUse = ?  WHERE travel_Id = ?`,[json["travel_IsUse"], json["travel_Id"]]);

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
router.post("/delete", async (req, res) => {
  try {
    const json = req.body;

    if (!json["travel_Id"]) {
      res.send({
        status: "400",
        message: "WARNING",
        detail: "No Data found",
      });
      return;
    }

    
    await db.query(`DELETE FROM travels WHERE travel_Id = ?`, [json["travel_Id"],]);
    await db.query(`DELETE FROM traveltypes WHERE travel_Id = ?`, [json["travel_Id"]]);
    await db.query(`DELETE FROM travelactivities WHERE travel_Id = ?`, [json["travel_Id"]]);

    const [res_imgs] = await db.query(`SELECT * FROM travelimgs  WHERE travel_Id = ?`,json["travel_Id"]);
    res_imgs.forEach(async (item) => {
      removefile(item.travelImg_Path)
      await db.query(`DELETE FROM travelimgs WHERE travelImg_Id = ?`, [item.travelImg_Id]);
    });

    res.send({
      status: "200",
      message: "SUCCESS",
      detail: "successful",
    });

  } catch (err) {
    res.send({ status: "500", message: "ERROR", detail: err.message });
  }
});

router.post("/delete-img", async (req, res) => {
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

    const deleteImgs = json['delete_imgs']
    
    deleteImgs.forEach(async (item) => {
      removefile(item.travelImg_Path)
      await db.query(`DELETE FROM travelimgs WHERE travelImg_Id = ?`, [item["travelImg_Id"]]);
    });

    res.send({
      status: "200",
      message: "SUCCESS",
      detail: "successful",
    });
  } catch (err) {
    res.send({ status: "500", message: "ERROR", detail: err.message });
  }
});

function padCRC32(input) {
  // Compute the CRC32 checksum
  const checksum = crc.crc32(input).toString(10); // Convert to base 10
  // Pad the checksum to 13 characters with leading zeros
  return checksum.padStart(13, "0");
}

module.exports = router;
