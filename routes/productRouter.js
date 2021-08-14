const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


const { getProducts,  
        newProduct, 
        getSingleProduct, 
        updateProduct,
        deleteProduct ,
        createProductReview,
        getProductReviews,
        deleteReview,
        getUIProducts,
        getInforLimitProducts,
        addReplyReviews
    } = require('../controllers/productCtrl')

router.route('/products').get(getProducts);
router.route('/products_list').get(getInforLimitProducts);
router.route('/products/:id').get(getSingleProduct);

router.route('/ui/products').get(getUIProducts);
router.route('/admin/products/new').post(auth, authAdmin,newProduct);
router.route('/admin/products/:id')
        .put(auth, authAdmin,updateProduct)
        .delete(auth, authAdmin,deleteProduct);


router.route('/review').put(auth, createProductReview)
router.route('/reviews_product').get(getProductReviews)
router.route('/delete_review').delete(auth,deleteReview)
router.route('/review_reply').put(auth,authAdmin,addReplyReviews)

module.exports = router;