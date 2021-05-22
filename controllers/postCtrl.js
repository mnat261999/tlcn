const Posts = require('../models/postModel')
const APIFeatures = require('../utils/apiFeatures')
const Users = require('../models/userModel')

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    paginating(resPerPage){
        const currentPage = Number(this.queryString.page) || 1;
        console.log({currentPage})
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;

    }
  
}

const postCtrl={
    createPost: async(req, res) =>{
        try {
            const {title, body, images, description, slug, topic} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})
             if(!title || !description)
            return res.status(400).json({msg: "Please fill in all fields."})

            const user = await Users.findOne({_id:req.user.id})
            console.log(user)
            const newPost = new Posts({
                title, body, images, description, slug, topic, userAvatar:user.avatar, userName:user.name, userId:req.user.id
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

            const features = new APIfeatures(Posts.find({userId:req.user.id}).populate("PostedBy","_id name"), req.query)
            /* .paginating() */
        
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
            const {title, body, images, description, slug,topic} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})
             if(!title || !description)
            return res.status(400).json({msg: "Please fill in all fields."})

            await Posts.findOneAndUpdate({_id: req.params.id}, {
                title, body, images, description, slug,topic
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
    },
    getPost: async(req, res) => {
        try {
            console.log('query')
            console.log(req.query)
            const postsCount = await Posts.countDocuments();
            const resPerPage = 11;

            const features = new APIfeatures(Posts.find(), req.query)
            /* .filtering() .sorting() .searching() .paginating(resPerPage) */
        
            const posts = await features.query;
        
            res.json({
                status: 'success',
                result: posts.length,
                resPerPage,
                postsCount,
                posts:posts
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = postCtrl