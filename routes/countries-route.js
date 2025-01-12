const express = require("express");
const router = express.Router();
const CountriesController = require("../controllers/CountriesController");

router.get('/', CountriesController.index);
router.post('/', CountriesController.create);
router.delete('/:id', CountriesController.deleteCountry);
router.get("/blogs", CountriesController.getBlogsByCountry);

module.exports = router