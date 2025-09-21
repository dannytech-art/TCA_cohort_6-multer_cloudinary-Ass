const multer = require('multer')

const storage = multer.diskStorage({
        destination : (req, file, cb)=>{
              cb(null, './uploads')
        },
        filename: (req, file, cb)=>{
              cb(null, file.originalname)
        }
})
const fileFilter = (req, file, cb)=>{
    if(file.mimetype.startsWith('image/')){
        cb(null, true)
    }else{
        cb(new Error( `invalid file format only image allowed`))
    }
}
const Limits = {
    fileSize: 1024 * 1024 * 2
}

const uploads = {
    storage,
    fileFilter,
    Limits
}

module.exports = uploads