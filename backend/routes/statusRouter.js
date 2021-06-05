const router = require('express').Router()
const statusCtrl = require('../controllers/statusCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/status')
    .get(statusCtrl.getStatus)
    .post(auth, authAdmin, statusCtrl.createStatus)

router.route('/status/:id')
    .delete(auth, authAdmin, statusCtrl.deleteStatus)
    .put(auth, authAdmin, statusCtrl.updateStatus)

module.exports = router