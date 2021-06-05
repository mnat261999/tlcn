const router = require('express').Router()
const topicCtrl = require('../controllers/topicCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/topic')
    .get(topicCtrl.getTopics)
    .post(auth, authAdmin, topicCtrl.createTopic)

router.route('/topic/:id')
    .delete(auth, authAdmin, topicCtrl.deleteTopic)
    .put(auth, authAdmin, topicCtrl.updateTopic)

module.exports = router