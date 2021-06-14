const Category = require('../models/categoryModel')
const Product = require('../models/productModel')
const slugify = require("slugify");
const TypePages = require('../models/typePageModel')

const categoryCtrl ={
    createCategory: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update category
            const type = await TypePages.find({_id:req.body.type})
            let nameType ;
            type.map(_ =>{
                nameType = _.name
            })
            //console.log({nameType}) //
            const categoryObj = {
                name: req.body.name,
                slug: slugify(req.body.name),
                type: req.body.type,
                nameType:nameType
            };

            if (req.body.parentId) {
                categoryObj.parentId = req.body.parentId;
            }

            const cat = new Category(categoryObj);

            const category = await cat.save()

            res.json({
                msg: "Created a category",
                category
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async(req, res) =>{
        try {
            const products = await Product.findOne({category: req.params.id})
            if(products) return res.status(400).json({
                msg: "Please delete all products with a relationship."
            })
            await Category.findByIdAndDelete(req.params.id)
            //console.log(req.params.id)
            res.json({msg: "Deleted a Category"}) 
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleletManyCategory: async(req, res) =>{
        const { ids } = req.body
/*         const idArray = ids
        const products = []; */
/*         for(let i = 0; i < idArray.length; i++) {
            const product= await Product.find({category: _._id})
            console.log({product})
            products.push(product)
            
        }
        console.log(products.length)
        if(products.length > 0)
        {
            return res.status(400).json({
                msg: "Please delete all products with a relationship."
            })
        } */
        const deleteCategories = []
        for(let i = 0; i < ids.length; i++)
        {
            const product = await Product.findOne({category: ids[i]._id})
            //console.log({product})
            if(product)
            {
                console.log(true)
                return res.status(202).json({
                    msg: "You can't delete. Please delete all products with a relationship."
            })
            }else{
                const deleteCategory = await Category.findOneAndDelete({_id: ids[i]._id})
                deleteCategories.push(deleteCategory)
            }
        }
        if(deleteCategories.length == ids.length)
        {
            res.status(201).json({msg: 'Category removed'})
        }
        else{
            res.status(400).json({msg: 'Something went wrong'})
        }
    },
    updateCategory: async(req, res) =>{
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
/*      updateCategoryProduct: async(req, res) =>{
        try {
            const {products} = req.body;
            console.log('products aâ',{products})
            console.log('req.params.id',req.params.id)
            const cat = await Category.findOneAndUpdate({_id: req.params.id}, {products})

            res.json({msg: "Updated a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    } */
    updateManyCategory: async(req, res) =>{
        const {_id,name, parentId, type,nameType} = req.body
        const updatedCategories =[];
        //console.log('name',name)
        //console.log('parentId',parentId)
        //console.log('type ',type)

        if(name instanceof Array)
        {
            for(let i = 0; i <name.length; i++)
            {
                console.log('parentId[i]: ',parentId[i])
                console.log('_id[i] ',_id[i])
                let nameOfType ;
                const typeName = await TypePages.find({_id:type[i]})
                typeName.map(_ =>{
                    nameOfType= _.name
                })

                //console.log({nameOfType})
                
                const category = { 
                    name: name[i],
                    type: type[i],
                    nameType:nameOfType
                }
                if(parentId[i] !== "")
                {
                        category.parentId == parentId[i]
                }
                //console.log({category})
                const updateCategory = await Category.findOneAndUpdate({_id: _id[i]}, category, {new: true})
                updatedCategories.push(updateCategory)
            } 
            return res.status(201).json({
                msg: "Update is successful",
                updatedCategories: updatedCategories
            })
        }else{
            let nameOfType ;
            const typeName = await TypePages.find({_id:type})
            typeName.map(_ =>{
                nameOfType= _.name
            })
            const category ={
                name,
                slug: slugify(name),
                type,
                nameType:nameOfType
            };
            if(parentId !== ""){
                category.parentId = parentId
            }
            console.log({category})

            const updateCategory = await Category.findOneAndUpdate({_id}, category, {new: true})

            return res.status(201).json({
                msg: "Update is successful",
                updateCategory
            })
        }
        res.status(200).json({body: req.body})
    },
    getCategories: async(req, res) =>{
        try {
 /*            Category.find().exec((error, categories) => {
                if (error) return res.status(400).json({ error });
                console.log(categories)
                if (categories) {
                  const categoryList = createCategories(categories);
                  res.status(200).json({ categoryList });
                }
            }); */
            const categories = await Category.find()
            
            const categoryList = createCategories(categories);
            
            res.status(200).json({ categoryList });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    } ,
    getListCategories: async(req, res) =>{
        try {
 /*            Category.find().exec((error, categories) => {
                if (error) return res.status(400).json({ error });
                console.log(categories)
                if (categories) {
                  const categoryList = createCategories(categories);
                  res.status(200).json({ categoryList });
                }
            }); */
            const categories = await Category.find()
            
            
            res.status(200).json({ categories });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    } ,
     getListCategoryProduct: async(req, res)=>{
        try {
            const type = await TypePages.find()
            type.map(async _ =>{
                if(_.name === "product")
                {
                    const categoriesListProduct = await Category.find({type: _.id})
                    return res.json({
                        categoriesListProduct
                    })
                }
            })

            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }  /* ,
    getGroupListCategoryProduct: async(req, res)=>{
        try {
            Category.aggregate([
                {
                    $lookup:{
                        from: "typepages",
                        localField: "type",
                        foreignField: "_id",
                        as: "group_cat_type"
                    }
                },{
                    $unwind: "$group_cat_type"
                },
                {
                    $match: {
                        "group_cat_type.name": "product"
                    }
                }
            ]).exec(function (err, result) {
                console.log(result);
              });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    } */,
    getCategoriesGroupListProduct: async(req, res) =>{
        try {
            Category.aggregate([
                {
                    $lookup:{
                        from: "products",
                        localField: "_id",
                        foreignField: "category",
                        as: "group_list_product"
                    }
                }
            ]).exec(function (err, result) {
                //console.log(result);
                const groupListProduct = createCategories(result)
                res.json({groupListProduct:groupListProduct})
              });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }/* ,
    getLimitCategoriesGroupListProduct: async(req, res) =>{
        try {
            Category.aggregate([
                {
                    $lookup:{
                        from: "products",
                        localField: "_id",
                        foreignField: "category",
                        as: "group_list_product"
                    }
                },
                {
                    $unwind: "$group_list_product"
                },
                {
                    $limit: 8
                }
            ]).exec(function (err, result) {
                console.log(result);
                const groupLimitListProduct = createCategories(result)
                res.json({groupLimitListProduct:groupLimitListProduct})
              });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    } */
}

function createCategories(categories, parentId = null) {
    const categoryList = [];
    //console.log('parentId function',parentId)
    let category;
    if (parentId == null) {
      category = categories.filter((cat) => cat.parentId == undefined);
      console.log('category12',{category})
    } else {
      category = categories.filter((cat) => cat.parentId == parentId);
      console.log('category11',{category})
    }


  
    for (let cate of category) {

      categoryList.push({
        _id: cate._id,
        name: cate.name,
        slug: cate.slug,
        parentId: cate.parentId,
        type: cate.type,
        nameType:cate.nameType,
        group_list_product:cate.group_list_product,
        children: createCategories(categories, cate._id)
      });
    }
  
    return categoryList;
  }

/*   function createCategories(categories, parentId = null) {
    const categoryList = [];
    console.log('parentId function',parentId)
    let category;
    if (parentId == null) {
      category = categories.filter((cat) => cat.parentId == undefined);
      console.log('category12',{category})
    } else {
      category = categories.filter((cat) => cat.parentId == parentId);
      console.log('category11',{category})
    }
  
    for (let cate of category) {
      categoryList.push({
        _id: cate._id,
        name: cate.name,
        slug: cate.slug,
        parentId: cate.parentId,
        type: cate.type,
        children: createCategories(categories, cate._id),
      });
    }
  
    return categoryList;
  }
 */
module.exports = categoryCtrl