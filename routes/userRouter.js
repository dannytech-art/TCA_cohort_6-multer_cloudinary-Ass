const { createUser, getall, getone } = require('../controllers/userController')
const uploads = require('../middleware/multer')
const router = require('express').Router()

router.post("/user",uploads.fields([{ name: "dp", maxCount: 1 },{ name: "gallery", maxCount: 8 }]),createUser);

router.get('/users',getall)

router.get('/user/:id', getone)

module.exports = router