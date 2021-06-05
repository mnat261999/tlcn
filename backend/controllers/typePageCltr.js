const TypePages = require('../models/typePageModel')
const Category = require('../models/categoryModel')

const typePageCltr ={
    createTypePage: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update status
            const {name} = req.body;
            const typePages = await TypePages.findOne({name})
            if(typePages) return res.status(400).json({msg: "This type pet already exists."})

            const newTypePages = new TypePages({name})

            await newTypePages.save()
            res.json({msg: "Created a type page"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteTypePage: async(req, res) =>{
        try {
            const pages = await Category.findOne({type: req.params.id})
            if(pages) return res.status(400).json({
                msg: "Please delete all pages with a relationship."
            })
 
            await TypePages.findByIdAndDelete(req.params.id)
            console.log(req.params.id)
            res.json({msg: "Deleted a Type Page"}) 
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateTypePage: async(req, res) =>{
        try {
            const {name} = req.body;
            await TypePages.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a type page"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getTypePage: async(req, res) =>{
        try {
            const typePages = await TypePages.find()
            res.json(typePages)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = typePageCltr