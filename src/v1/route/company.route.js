var express = require('express');
var router = express.Router();
const companyController = require('../controller/company.controller')

router.get('/', companyController.index);
router.get('/:id', companyController.detail);
router.post('/', companyController.create);
router.put('/:id', companyController.update);
router.delete('/:id', companyController.delete);

module.exports = router;
