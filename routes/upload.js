const router = require('express').Router()
const uploadImage = require('../middleware/uploadImage')
const uploadCtrl = require('../controllers/uploadCtrl')
const deleteImage = require('../middleware/deleteImage')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/upload_avatar', uploadImage, auth, uploadCtrl.uploadAvatar)

router.post('/upload_product',uploadImage,uploadCtrl.uploadImageProduct)

router.post('/destroy_admin',deleteImage)

module.exports = router