const TypePets = require('../models/typePetModel')
const Cases = require('../models/caseModel')

const typePetCtrl ={
    createTypePet: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update status
            const {name} = req.body;
            const typePets = await TypePets.findOne({name})
            if(typePets) return res.status(400).json({msg: "This type pet already exists."})

            const newTypePets = new TypePets({name})

            await newTypePets.save()
            res.json({msg: "Created a type pet"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteTypePet: async(req, res) =>{
        try {
              const typePets = await Cases.findOne({typePet: req.params.id})
            if(typePets) return res.status(400).json({
                msg: "Please delete all types pet with a relationship."
            })
 
            await TypePets.findByIdAndDelete(req.params.id)
            console.log(req.params.id)
            res.json({msg: "Deleted a Type Pet"}) 
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateTypePet: async(req, res) =>{
        try {
            const {name} = req.body;
            await TypePets.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a type pet"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getTypePet: async(req, res) =>{
        try {
            const typePets = await TypePets.find()
            res.json(typePets)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = typePetCtrl