const router = require('express').Router()
const caseCtrl = require('../controllers/caseCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/case')
    .post(auth, authAdmin, caseCtrl.createCase)
    .get(auth, authAdmin, caseCtrl.getCase)
router.route('/case/:id')
    .delete(auth, authAdmin, caseCtrl.deleteCase)
    .put(auth, authAdmin, caseCtrl.updateCase)


module.exports = router