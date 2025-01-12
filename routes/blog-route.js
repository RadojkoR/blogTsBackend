const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/BlogController");

router.get('/', BlogController.index);
router.get("/blogs?", BlogController.getBlogsByCountry);



module.exports = router