const express = require("express");
const router = express.Router();
const ContinentsController = require('../controllers/ContinentsController');

router.get('/', ContinentsController.index);
router.post('/', ContinentsController.create);

module.exports = router