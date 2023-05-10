const db = require("../model");
const Company = db.company;
const { responseFound, responseNotFound, responseErrorCode, responseInsertSuccess, responseInsertFail, responseUpdateSuccess, responseUpdateFail, responseDeleteSuccess, responseDeleteFail } = require("../helper/response.helper");
const { pagination, list } = require("../service/company.service");
let result = {}

exports.index = function(req, res, next) {
  if(req.query.page){
    result = pagination(req,res)
  }else{
    result = list(req,res)
  }
  res.status(result.status).json(result.res_body)
}

exports.detail = function(req, res, next) {
  Company.findByPk(req.params.id).then(data => {
    if(data){
      result = responseFound(data)
    }else{
      result = responseNotFound(res)
    }
    res.status(result.status).json(result.res_body)
  }).catch(err => {
    result = responseErrorCode(err.message)
    res.status(result.status).json(result.res_body)
  });
}

exports.create = function(req, res, next) {
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
    res.status(result.status).json(result.res_body)
  }).catch(err => {
    result = responseErrorCode(err.message)
    res.status(result.status).json(result.res_body)
  });
}

exports.update = function(req, res, next) {
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
    res.status(result.status).json(result.res_body)
  }).catch(err => {
    result = responseErrorCode(err.message)
    res.status(result.status).json(result.res_body)
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
    res.status(result.status).json(result.res_body)
  }).catch(err => {
    result = responseErrorCode(err.message)
    res.status(result.status).json(result.res_body)
  });
}