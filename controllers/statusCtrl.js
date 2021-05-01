const Status = require('../models/statusModel')

const statusCtrl ={
    createStatus: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update status
            const {name} = req.body;
            const status = await Status.findOne({name})
            if(status) return res.status(400).json({msg: "This status already exists."})

            const newStatus = new Status({name})

            await newStatus.save()
            res.json({msg: "Created a status"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteStatus: async(req, res) =>{
        try {
/*              const products = await Products.findOne({category: req.params.id})
            if(products) return res.status(400).json({
                msg: "Please delete all products with a relationship."
            })
 */
            await Status.findByIdAndDelete(req.params.id)
            console.log(req.params.id)
            res.json({msg: "Deleted a Category"}) 
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateStatus: async(req, res) =>{
        try {
            const {name} = req.body;
            await Status.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getStatus: async(req, res) =>{
        try {
            const status = await Category.find()
            res.json(status)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = statusCtrl