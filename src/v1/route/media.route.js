var express = require('express');
var router = express.Router();
const mediaController = require('../controller/media.controller');
router.post('/', mediaController.uploadFile);

module.exports = router;
