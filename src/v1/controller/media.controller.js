const { responseInsertSuccess, responseInsertFail, responseErrorCode } = require("../helper/response.helper");
const uploadFile = require('../helper/uploadFile.helper');
const db = require("../model");
const Media = db.media;

exports.uploadFile = function(req, res, next) {
  uploadFile(req.body.folder_name).single('filename'),
  res.status(responseInsertSuccess({}).status).json(responseInsertSuccess({}).res_body)
    // var storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //       cb(null, 'storage')
    //     },
    //     filename: function (req, file, cb) {
    //       cb(null, file.fieldname + '-' + Date.now())
    //     }
    // })
      
    // const upload = multer({ storage: storage })
    // upload.single('filename')

    // console.log(req.files)
    // const { filename } = req.body
    // Media.create({ 
    //   filename, 
    //   is_used : 0, 
    //   created_at : null
    // }).then(data => {
    //   if(data){
    //     result = responseInsertSuccess({id:data.id})
    //   }else{
    //     result = responseInsertFail()
    //   }
    //   res.status(result.status).json(result.res_body)
    // }).catch(err => {
    //   result = responseErrorCode(err.message)
    //   res.status(result.status).json(result.res_body)
    // });
}