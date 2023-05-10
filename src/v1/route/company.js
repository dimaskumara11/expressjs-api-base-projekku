var express = require('express');
var router = express.Router();
const companyController = require('../controller/company.controller')

router.get('/', companyController.index);

module.exports = router;
