const db = require("../model");
const Company = db.company;
const { responseFound, responseNotFound, responseErrorCode } = require("../helper/response.helper");
const { paginate } = require("../helper/paginate.helper");

exports.pagination = function(req, res) {
    Company.findAndCountAll(paginate({
      where: search(req),
      order: [[(req.query.order_field || "id"),(req.query.order || "ASC")]]
    },{
      page : parseInt(req.query.page_size || 1),
      pageSize : parseInt(req.query.page_size || 10)
    })).then(data => {
      if(data.count > 0){
        return responseFound(data)
      }else{
        return responseNotFound(res)
      }
    }).catch(err => {
        return responseErrorCode(err.message)
    });
  };
  
exports.list = function(req, res) {
    Company.findAll({
      where: search(req)
    }).then(data => {
      if(data.length > 0){
        return responseFound(data)
      }else{
        return responseNotFound(res)
      }
    }).catch(err => {
        return responseErrorCode(err.message)
    });
  };
  
const search = function(req) {
    const filter = {}
    if(req.query.name) filter.name = {[Op.like]: '%'+req.query.name+'%'}
    if(req.query.owner_name) filter.owner_name = {[Op.like]: '%'+req.query.owner_name+'%'}
    return filter
}