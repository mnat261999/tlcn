const Pets = require('../models/petModel')


//filter, sorting and paganating
class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    searching() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({ ...keyword });
        return this;
    }


    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       console.log({before:queryObj}) // before delete page

       const excludedFields = ['page', 'sort', 'limit', 'keyword']
       excludedFields.forEach(el => delete(queryObj[el]))

       console.log({after:queryObj}) // after delete page

       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
       console.log({queryStr})

       this.query.find(JSON.parse(queryStr))

       return this
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            console.log(sortBy)
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    } 

    paginating(resPerPage){
        const currentPage = Number(this.queryString.page) || 1;
        console.log({currentPage})
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;

    }
  
}

const petCtrl={
    createPet: async(req, res) =>{
        try {
            const {pet_code, name, type, color, weight, sex, vaccination, moreinfor, images, status} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const pets = await Pets.findOne({pet_code})

            console.log(pets)
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
            console.log('query')
            console.log(req.query)
            const petsCount = await Pets.countDocuments();
            const resPerPage = 11;

            const features = new APIfeatures(Pets.find(), req.query)
            .filtering() .sorting() .searching() .paginating(resPerPage)
        
            const pets = await features.query;
        
            res.json({
                status: 'success',
                result: pets.length,
                resPerPage,
                petsCount,
                pets:pets
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = petCtrl