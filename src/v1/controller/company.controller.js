const db = require("../model");
const Company = db.company;
const Op = db.Sequelize.Op;
const responseFormat = require("../helper/response.helper")

exports.index = function(req, res, next) {
  if(req.query.pagination){
    pagination(req,res)
  }else{
    list(req,res)
  }
}

const pagination = function(req, res) {
  Company.findAndCountAll({
    where: search(req),
    order: [],
    limit: 5,
    offset: 0,
  }).then(data => {
    if(data.count > 0){
      responseFormat.responseFound(res, data)
    }else{
      responseFormat.responseNotFound(res)
    }
  }).catch(err => {
    responseFormat.responseErrorCode(res, err.message)
  });
};

const list = function(req, res) {
  Company.findAll({
    where: search(req)
  }).then(data => {
    if(data.length > 0){
      responseFormat.responseFound(res, data)
    }else{
      responseFormat.responseNotFound(res)
    }
  }).catch(err => {
    responseFormat.responseErrorCode(res, err.message)
  });
};

const search = function(req) {
  const filter = {}
  if(req.query.name) filter.name = req.query.name
  if(req.query.owner_name) filter.owner_name = req.query.owner_name
  return filter
}