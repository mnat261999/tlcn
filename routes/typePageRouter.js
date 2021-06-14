const router = require('express').Router()
const typePageCtrl = require('../controllers/typePageCltr')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/typepage')
    .get(typePageCtrl.getTypePage)
    .post(auth, authAdmin, typePageCtrl.createTypePage)

router.route('/typepage/:id')
    .delete(auth, authAdmin, typePageCtrl.deleteTypePage )
    .put(auth, authAdmin, typePageCtrl.updateTypePage)

module.exports = router