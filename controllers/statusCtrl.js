const Status = require('../models/statusModel')
const Pets = require('../models/petModel')

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
              const stauses = await Pets.findOne({status: req.params.id})
            if(stauses) return res.status(400).json({
                msg: "Please delete all statuses with a relationship."
            })
 
            await Status.findByIdAndDelete(req.params.id)
            console.log(req.params.id)
            res.json({msg: "Deleted a Status"}) 
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateStatus: async(req, res) =>{
        try {
            const {name} = req.body;
            await Status.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a status"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getStatus: async(req, res) =>{
        try {
            const status = await Status.find()
            res.json(status)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = statusCtrl