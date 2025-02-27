var express = require("express");
const router = express.Router();
var cors = require("cors");
var bodyParser = require("body-parser");
const apiUser = require("./api-user");
const apiStaff = require("./api-staff");
const apiService = require("./api-service");
const apiBooking = require("./api-booking");
const apiReport = require("./api-report");


router.use(cors());
router.use(bodyParser.json({ limit: "50mb" }));
router.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 500000,
}));

router.use(express.json({ limit: "50mb" }));
router.use(express.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 500000,
}));


router.use(express.static("public"));
router.use("/uploads", express.static("uploads"));


router.use("/user", apiUser);
router.use("/staff", apiStaff);
router.use("/service", apiService);
router.use("/booking", apiBooking);
router.use("/report", apiReport);

module.exports = router;
