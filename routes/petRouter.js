const router = require('express').Router()
const petCtrl = require('../controllers/petCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/pets').get(petCtrl.getPet)
router.route('/admin/pet/new').post(auth, authAdmin, petCtrl.createPet)
router.route('/admin/pet/:id')
    .delete(auth, authAdmin, petCtrl.deletePet)
    .put(auth, authAdmin, petCtrl.updatePet)


module.exports = router