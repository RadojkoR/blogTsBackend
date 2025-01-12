const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/BlogController");

router.get('/', BlogController.index);
router.get("/", BlogController.getBlogsByCountry);
// Ruta za kreiranje novog bloga
router.post("/", BlogController.create);

// Ruta za jedan blog prema ID-u
router.get("/:id", BlogController.getSingelBlog);

// Ruta za editovanje bloga
router.put("/:id", BlogController.edit);

// Ruta za brisanje bloga
router.delete("/:id", BlogController.deleteBlog);



module.exports = router