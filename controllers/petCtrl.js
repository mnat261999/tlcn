const Pets = require('../models/petModel')
const APIFeatures = require('../utils/apiFeatures')

const petCtrl={
    createPet: async(req, res) =>{
        try {
            const {pet_code, name, type, color, weight, sex, vaccination, moreinfor, images, status} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const pets = await Pets.findOne({pet_code})
            if(pets)
                return res.status(400).json({msg: "Pet already exists."})

            const newPet = new Pets({
                pet_code, name, type, color, weight, sex, vaccination, moreinfor, images, status
            })

            await newPet.save()
            res.json({msg: "Pet is created"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deletePet: async(req,res) => {
        try {
            await Pets.findByIdAndDelete(req.params.id)
            console.log("pet:"+ req.params.id)
            res.json({msg:"Delete a Pet"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updatePet: async(req, res) =>{
        try {
            const {pet_code, name, type, color, weight, sex, vaccination, moreinfor, images, status} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Pets.findOneAndUpdate({_id: req.params.id}, {
                pet_code, name, type, color, weight, sex, vaccination, moreinfor, images, status
            })

            res.json({msg: "Pet is updated"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getPet: async(req, res) => {
        try {
            const petsCount = await Pets.countDocuments();

            const features = new APIFeatures(Pets.find(), req.query)
            .filtering().sorting().paginating()
        
            const pets = await features.query;
        
            res.json({
                status: 'success',
                result: pets.length,
                petsCount,
                pets:pets
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = petCtrl