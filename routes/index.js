const express = require("express");
const cors = require("cors");
const HomeController = require("../controllers/HomeController");
const CountriesController = require("../controllers/CountriesController");
const BlogController = require("../controllers/BlogController");
const ContinentsController = require("../controllers/ContinentsController");

const router = express();

router.use(cors());

router.get("/",HomeController.index);

router.get("/continents", require('./continents-route'));
router.post("/continents",ContinentsController.create);
router.delete("/continents/:id", ContinentsController.deleteContinent);

router.get("/countries", CountriesController.index);

router.get("/blogs", BlogController.index);
router.post("/blogs", BlogController.createNewBlog);
router.get("/blogs/:id", BlogController.getSingelBlog);
router.put("/blogs/:id", BlogController.edit);
router.delete("/blogs/:id", BlogController.deleteBlog);

module.exports = router