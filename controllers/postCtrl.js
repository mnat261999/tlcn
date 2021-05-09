const Posts = require('../models/postModel')
const APIFeatures = require('../utils/apiFeatures')
const Users = require('../models/userModel')

const postCtrl={
    createPost: async(req, res) =>{
        try {
            const {title, body, images, description, slug} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})
             if(!title || !description)
            return res.status(400).json({msg: "Please fill in all fields."})

            const user = await Users.findOne({_id:req.user.id})
            console.log(user)
            const newPost = new Posts({
                title, body, images, description, slug, userName:user.name, userId:req.user.id
            })

            await newPost.save()
            res.json({msg: "Post is created"})
            //console.log(req.user)


        } catch (err) {
            console.log(err)
            return res.status(500).json({msg: err.message})
  
        }
    },
    getPostByUser: async(req, res) => {
        try {
            const postsCount = await Posts.countDocuments();

            const features = new APIFeatures(Posts.find({userId:req.user.id}).populate("PostedBy","_id name"), req.query)
            .paginating()
        
            const myPosts = await features.query;
        
            res.json({
                status: 'success',
                result: myPosts.length,
                postsCount,
                myPosts:myPosts
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updatePost: async(req, res) =>{
        try {
            const {title, body, images, description, slug} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})
             if(!title || !description)
            return res.status(400).json({msg: "Please fill in all fields."})

            await Posts.findOneAndUpdate({_id: req.params.id}, {
                title, body, images, description, slug
            })

            res.json({msg: "Post is updated"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deletePost: async(req,res) => {
        try {
            await Posts.findByIdAndDelete(req.params.id)
            console.log("post:"+ req.params.id)
            res.json({msg:"Delete a Post"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = postCtrl