const express = require("express");
const cors = require("cors");
const HomeController = require("../controllers/HomeController");
const CountriesController = require("../controllers/CountriesController");
const BlogController = require("../controllers/BlogController")

const router = express();

router.use(cors());

router.get("/",HomeController.index);
router.get("/destination", CountriesController.getCountriesByContinent);
router.get("/blogs", BlogController.index);

module.exports = router