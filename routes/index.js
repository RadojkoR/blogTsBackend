const express = require("express");
const cors = require("cors");
const HomeController = require("../controllers/HomeController");
const BlogController = require("../controllers/BlogController");

const router = express();

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/",HomeController.index);

router.use("/continents", require('./continents-route'));
router.use("/continents/:id", require('./continents-route'));

router.use("/countries", require('./countries-route'));

router.get("/blogs", BlogController.index);
router.post("/blogs", BlogController.createNewBlog);
router.get("/blogs/:id", BlogController.getSingelBlog);
router.put("/blogs/:id", BlogController.edit);
router.delete("/blogs/:id", BlogController.deleteBlog);

module.exports = router