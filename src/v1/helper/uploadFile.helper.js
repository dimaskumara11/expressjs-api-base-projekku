var multer = require('multer');
var fs = require('fs');
module.exports = {
    storage : () => {
        const multerStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                var dir = `storage/${req.body.folder_name}`;
        
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
        return multerStorage
    }
}