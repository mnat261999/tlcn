const router = require('express').Router()
const typePetCtrl = require('../controllers/typePetCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/type')
    .get(typePetCtrl.getTypePet)
    .post(auth, authAdmin, typePetCtrl.createTypePet)

router.route('/type/:id')
    .delete(auth, authAdmin, typePetCtrl.deleteTypePet )
    .put(auth, authAdmin, typePetCtrl.updateTypePet)

module.exports = router