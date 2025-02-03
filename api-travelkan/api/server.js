var express = require("express");
const router = express.Router();
var cors = require("cors");
var bodyParser = require("body-parser");
const apiUser = require("./api-user");
const apiMember = require("./api-member");
const apiTravel = require("./api-travel");
const apiReview = require("./api-review");
const apiTravelType = require("./api-travel-type");
const apiTravelActivity = require("./api-travel-activity");
const apiAddress = require("./api-address");

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
router.use("/member", apiMember);
router.use("/travel", apiTravel);
router.use("/review", apiReview);
router.use("/travel-type", apiTravelType);
router.use("/travel-activity", apiTravelActivity);
router.use("/address", apiAddress);


module.exports = router;
