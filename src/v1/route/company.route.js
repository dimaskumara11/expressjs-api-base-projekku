var express = require('express');
var router = express.Router();
const companyController = require('../controller/company.controller');
const { createValidation } = require('../validation/company.validation');

router.get('/', companyController.index);
router.get('/:id', companyController.detail);
router.post('/',createValidation(), companyController.create);
router.put('/:id', companyController.update);
router.delete('/:id', companyController.delete);

module.exports = router;
