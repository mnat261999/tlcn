const Cases = require('../models/caseModel')

const caseCtrl={
    createCase: async(req, res) =>{
        try {
            const {case_code, name, type, color, weight, sex, vaccination, moreinfor, images, staus} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const cases = await Cases.findOne({case_code})
            if(cases)
                return res.status(400).json({msg: "Case already exists."})

            const newCase = new Cases({
                case_code, name, type, color, weight, sex, vaccination, moreinfor, images, staus
            })

            await newCase.save()
            res.json({msg: "Case is created"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCase: async(req,res) => {
        try {
            await Cases.findByIdAndDelete(req.params.id)
            console.log("case:"+ req.params.id)
            res.json({msg:"Delete a Case"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCase: async(req, res) =>{
        try {
            const {case_code, name, type, color, weight, sex, vaccination, moreinfor, images, staus} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Cases.findOneAndUpdate({_id: req.params.id}, {
                case_code, name, type, color, weight, sex, vaccination, moreinfor, images, staus
            })

            res.json({msg: "Case is updated"})
        } catch (err) {
            
        }
    },
    getCase: async(req, res) => {
        try {
            const cases = await Cases.find()
            res.json(cases)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = caseCtrl