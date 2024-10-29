const express = require("express");
const cors = require("cors");
const HomeController = require("../controllers/HomeController");
const CountriesController = require("../controllers/CountriesController");

const router = express();

router.use(cors());

router.get("/",HomeController.index);
router.get("/destination/:continent", CountriesController.getCountriesByContinent);

module.exports = router