const multer = require("multer");
const { responseInsertSuccess, responseInsertFail, responseErrorCode } = require("../helper/response.helper");
const uploadFile = require('../helper/uploadFile.helper');
const db = require("../model");
const moment = require("moment/moment");
const Media = db.media;

exports.uploadFile = function(req, res, next) {
  var upload = multer({
    storage: uploadFile.storage(),
  }).single('filename');
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        res.send(err);
    } else if (err) {
        res.send(err);
    }else{
      const {filename, path} = req.file
      Media.create({ 
        path, 
        filename, 
        is_used : 0, 
        created_at : moment().format("YYYY-MM-DD HH:mm:ss")
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
  })
}