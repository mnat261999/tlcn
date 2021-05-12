const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const postCtrl = require('../controllers/postCtrl')

const {
    createPost,
    getPostByUser,
    updatePost,
    deletePost,
    getPost} = postCtrl

 router.route('/admin/my_posts').get(auth, authAdmin,getPostByUser);
 router.route('/posts').get(getPost);
/* router.route('/posts/:id').get(getSinglePost); */

router.route('/admin/posts/new').post(auth, authAdmin,createPost);
 router.route('/admin/posts/:id')
    .put(auth, authAdmin,updatePost)
    .delete(auth, authAdmin,deletePost);


module.exports = router;