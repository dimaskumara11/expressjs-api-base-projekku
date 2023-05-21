const db = require("../model");
const Company = db.company;
const { responseFound, responseNotFound, responseErrorCode, responseInsertSuccess, responseInsertFail, responseUpdateSuccess, responseUpdateFail, responseDeleteSuccess, responseDeleteFail, responseErrorValidation } = require("../helper/response.helper");
const { pagination, list } = require("../service/company.service");
const { createValidation } = require("../validation/company.validation");
const { validationResult } = require("express-validator");
let result = {}

exports.index = function(req, res, next) {
  if(req.query.page){
    pagination(req,res).then(data => {
      return res.status(data.status).json(data.res_body)
    }).catch(err => {
      return res.status(err.status).json(err.res_body)
    })
  }else{
    lists(req,res).then(data => {
      return res.status(data.status).json(data.res_body)
    }).catch(err => {
      return res.status(err.status).json(err.res_body)
    })
  }
}

exports.detail = function(req, res, next) {
  Company.findByPk(req.params.id, {
    include: [
      {
          model: db.sector,
      }
    ]
  }).then(data => {
    if(data){
      result = responseFound(data)
    }else{
      result = responseNotFound(res)
    }
    return res.status(result.status).json(result.res_body)
  }).catch(err => {
    result = responseErrorCode(err.message)
    return res.status(result.status).json(result.res_body)
  });
}

exports.create = function(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    result = responseErrorValidation(errors.array()[0].msg)
    return res.status(result.status).json(result.res_body)
  }

  const { sector_id, logo, name, owner_name} = req.body
  Company.create({ 
    sector_id, 
    logo, 
    name, 
    owner_name,
  }).then(data => {
    if(data){
      result = responseInsertSuccess({id:data.id})
    }else{
      result = responseInsertFail()
    }
    return res.status(result.status).json(result.res_body)
  }).catch(err => {
    result = responseErrorCode(err.message)
    return res.status(result.status).json(result.res_body)
  });
}

exports.update = function(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    result = responseErrorValidation(errors.array()[0].msg)
    return res.status(result.status).json(result.res_body)
  }
  
  const { sector_id, logo, name, owner_name} = req.body
  Company.update({
    sector_id, 
    logo, 
    name, 
    owner_name,
  },{
    where : { id: req.params.id }
  }).then(data => {
    if(data[0]){
      result = responseUpdateSuccess({id:req.params.id})
    }else{
      result = responseUpdateFail()
    }
    return res.status(result.status).json(result.res_body)
  }).catch(err => {
    result = responseErrorCode(err.message)
    return res.status(result.status).json(result.res_body)
  });
}

exports.delete = function(req, res, next) {
  Company.destroy({
    where : { id: req.params.id }
  }).then(data => {
    if(data){
      result = responseDeleteSuccess({id:req.params.id})
    }else{
      result = responseDeleteFail()
    }
    return res.status(result.status).json(result.res_body)
  }).catch(err => {
    result = responseErrorCode(err.message)
    return res.status(result.status).json(result.res_body)
  });
}