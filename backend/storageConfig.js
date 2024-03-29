const multer = require("multer");
const path = require("path");
const fs = require("fs");

module.exports = function (dir) {
    const storage = multer.diskStorage({
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname))
        },
        destination: function (req, file, cb) {
            const p = "storages/"+ dir;
            try{
                fs.statSync(p);
            }catch(err){
                fs.mkdirSync(p, {recursive: true});
            }
            cb(null, p)
        }
    })
    const upload = multer({ storage });
    return upload;
}
