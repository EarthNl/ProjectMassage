
const express = require('express');
const router = express.Router();
const {db} = require("../config/db");

//get
router.post('/report-count', async (req, res) => {
    try {
        const [count_booking] = await db.query(`SELECT COUNT(*) AS total FROM booking WHERE DATE(creationDate) = CURDATE()`);
        const [count_service] = await db.query(`SELECT COUNT(*) AS total FROM service`);
        const [count_staff] = await db.query(`SELECT COUNT(*) AS total FROM staff`);
        const [income_month] = await db.query(`
            SELECT 
            SUM((SELECT price FROM service WHERE service_id = A.service_id)) AS income        
            FROM booking AS A     
            WHERE MONTH(date) = MONTH(NOW()) AND status = "completed"`);

        const countBooking = parseInt(count_booking[0].total);
        const countService = parseInt(count_service[0].total);        
        const countStaff = parseInt(count_staff[0].total);
        const incomeMonth = parseInt(income_month[0].income);

        res.send({
          data: {
            countBooking: countBooking,
            countService: countService,
            countStaff: countStaff,
            incomeMonth: incomeMonth,
          },
          status: "200",
          message: "SUCCESS",
          detail: "successful",
        });

      } catch (err) {
        res.send({ status: "500", message: 'ERROR',detail:err.message });
      }
});

router.post("/report-booking", async (req, res) => {
  try {
    const [res_booking] = await db.query(
      `SELECT 
       A.*
      ,B.name AS service_name
      FROM booking AS A 
      LEFT JOIN service AS B ON B.service_id = A.service_id
      ORDER BY creationDate DESC`
    );

    res.send({
      data: res_booking,
      status: "200",
      message: "SUCCESS",
      detail: "successful",
    });
  } catch (err) {
    res.send({ status: "500", message: "ERROR", detail: err.message });
  }
});

module.exports = router;