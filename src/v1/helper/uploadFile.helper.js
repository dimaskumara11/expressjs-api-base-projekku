var multer = require('multer');
var fs = require('fs');
module.exports = (folderName) => {
    const multerStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            console.log(req)
            var dir = `storage/${folderName}`;
    
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }
            cb(null, dir);
        },
        filename: (req, file, cb) => {
            const ext = file.mimetype.split("/")[1];
            cb(null, `file-${Date.now()}.${ext}`);
        },
    });
    const uploadFile = multer({storage:multerStorage})
    return uploadFile
}