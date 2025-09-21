const usermodel = require('../model/userModel')
const cloudinary = require('../config/cloudinary')
const fs = require('fs')

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body

    // Check if user exists
    const userExist = await usermodel.findOne({ email: email.toLowerCase() })
    if (userExist) {
      // cleanup uploaded files if any
      if (req.files?.dp) fs.unlinkSync(req.files.dp[0].path)
      if (req.files?.gallery) {
        req.files.gallery.forEach(f => fs.unlinkSync(f.path))
      }
      return res.status(400).json({ message: `User already exists` })
    }

    let dpResult = null
    let galleryResults = []

    // Upload dp which is one
    if (req.files?.dp) {
      dpResult = await cloudinary.uploader.upload(req.files.dp[0].path, {
        folder: "users/dp"
      })
      fs.unlinkSync(req.files.dp[0].path) 
    }

    // Upload gallery which is multiple
    if (req.files?.gallery) {
      for (let file of req.files.gallery) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "users/gallery"
        })
        galleryResults.push(images)
          const images = {
          url: result.secure_url,
          publicId: result.public_id
        }
        fs.unlinkSync(file.path) 
      }
    }

    // Save user
    const user = new usermodel({
      firstName,
      lastName,
      email: email.toLowerCase(),
      displayPicture: dpResult ? {
        url: dpResult.secure_url,
        publicId: dpResult.public_id
      } : null,
      gallery: galleryResults
    })

    await user.save()

    res.status(201).json({
      message: `User successfully registered`,
      data: user
    })
  } catch (error) {
    if (req.files?.dp) fs.unlinkSync(req.files.dp[0].path)
    if (req.files?.gallery) {
      req.files.gallery.forEach(f => {
        if (fs.existsSync(f.path)) fs.unlinkSync(f.path)
      })
    }
    res.status(500).json({ message: error.message })
  }
}
exports.getall = async ()=>{
    try {
        const user = await usermodel.find()
        res.status(200).json({
            message: `users availabe`,
            data: user
        })
     } catch (error) {
        res.status( 500).json({
            message: error.message
        })
     }
}
exports.getone = async (req,res)=>{
    const id = req.params.id
     try {
        const user = await usermodel.findById(id)
        res.status(200).json({
            message: `users availabe`,
            data: user
        })
     } catch (error) {
        res.status( 500).json({
            message: error.message
        })
     }
}