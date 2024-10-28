const express = require("express");
const cors = require("cors");
const HomeController = require("../controllers/HomeController");

const router = express();

router.use(cors());

router.get("/",HomeController.index);

module.exports = router