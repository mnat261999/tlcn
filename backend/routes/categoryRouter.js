const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/category')
    .get(categoryCtrl.getCategories)
    .post(auth, authAdmin, categoryCtrl.createCategory)
router.route('/category_list')
    .get(categoryCtrl.getListCategories)
    

router.route('/category/:id')
    .delete(auth, authAdmin, categoryCtrl.deleteCategory)
    .put(auth, authAdmin, categoryCtrl.updateCategory)
router.route('/category/update').post(auth, authAdmin,categoryCtrl.updateManyCategory)
router.route('/category/delete').post(auth, authAdmin,categoryCtrl.deleletManyCategory)
router.route('/category_product').get(categoryCtrl.getListCategoryProduct)
//router.route('/category_group_product').get(categoryCtrl.getGroupListCategoryProduct)
router.route('/category_group_list').get(categoryCtrl.getCategoriesGroupListProduct)
//router.route('/category_limit_group_list').get(categoryCtrl.getLimitCategoriesGroupListProduct)
//router.route('/update_category_product/:id').patch(auth, authAdmin, categoryCtrl.updateCategoryProduct)


module.exports = router