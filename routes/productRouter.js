const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


const { getProducts,  
        newProduct, 
        getSingleProduct, 
        updateProduct,
        deleteProduct 
    } = require('../controllers/productCtrl')

router.route('/products').get(getProducts);
router.route('/products/:id').get(getSingleProduct);

router.route('/admin/products/new').post(newProduct);
router.route('/admin/products/:id')
    .put(updateProduct)
    .delete(deleteProduct);
module.exports = router;