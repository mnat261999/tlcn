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
        getAdminProducts,
        getInforLimitProducts
    } = require('../controllers/productCtrl')

router.route('/products').get(getProducts);
router.route('/products_list').get(getInforLimitProducts);
router.route('/products/:id').get(getSingleProduct);

router.route('/admin/products').get(auth, authAdmin,getAdminProducts);
router.route('/admin/products/new').post(auth, authAdmin,newProduct);
router.route('/admin/products/:id')
        .put(auth, authAdmin,updateProduct)
        .delete(auth, authAdmin,deleteProduct);


router.route('/review').put(createProductReview)
router.route('/reviews').get(getProductReviews)
router.route('/reviews').delete(deleteReview)

module.exports = router;