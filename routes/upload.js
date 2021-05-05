const router = require('express').Router()
const uploadImage = require('../middleware/uploadImage')
const uploadCtrl = require('../controllers/uploadCtrl')
const deleteImage = require('../middleware/deleteImage')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/upload_avatar', uploadImage, auth, uploadCtrl.uploadAvatar)

router.post('/upload_product',auth,authAdmin,uploadImage,uploadCtrl.uploadImageProduct)

router.post('/destroy_admin',auth,authAdmin,deleteImage)

router.post('/upload_case',auth,authAdmin,uploadImage,uploadCtrl.uploadImageProduct)

router.post('/upload_post',auth,authAdmin,uploadImage,uploadCtrl.uploadImagePost)

module.exports = router