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
        deleteReview
    } = require('../controllers/productCtrl')

router.route('/products').get(getProducts);
router.route('/products/:id').get(getSingleProduct);

router.route('/admin/products/new').post(newProduct);
router.route('/admin/products/:id')
    .put(updateProduct)
    .delete(deleteProduct);


router.route('/review').put(createProductReview)
router.route('/reviews').get(getProductReviews)
router.route('/reviews').delete(deleteReview)

module.exports = router;