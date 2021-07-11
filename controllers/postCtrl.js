const Posts = require('../models/postModel')
const APIFeatures = require('../utils/apiFeatures')
const Users = require('../models/userModel')

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filtering(){
        const queryObj = {...this.queryString} //queryString = req.query
 
        console.log({before:queryObj}) // before delete page
 
        const excludedFields = ['page', 'sort', 'limit', 'keyword']
        excludedFields.forEach(el => delete(queryObj[el]))
 
        console.log({after:queryObj}) // after delete page
 
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        //console.log({queryStr})
 
        this.query.find(JSON.parse(queryStr))
 
        return this
     }
 
     sorting(){
         if(this.queryString.sort){
             const sortBy = this.queryString.sort.split(',').join(' ')
             //console.log(sortBy)
             this.query = this.query.sort(sortBy)
         }else{
             this.query = this.query.sort('-createdAt')
         }
 
         return this;
     } 

     paginating(resPerPage){
        const currentPage = Number(this.queryString.page) || 1;
        //console.log({currentPage})
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


            if(!title || !description || !slug)
            return res.status(400).json({msg: "Please fill in all fields."})

            if(!topic)
            return res.status(400).json({msg: "Please choose topic."})

            const post = await Users.findOne({title})

            if(post) return res.status(400).json({msg: "This post already exists."})

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
            //console.log(Posts.find({userId:req.user.id}))
        
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
            .filtering() .sorting() /* .searching() .paginating(resPerPage) */
        
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
    },
    getNumPostByTopic: async(req, res) => {
        try {
/*             const posts = Posts.aggregate([{$group : {_id : "$topic", count: { $sum: 1 }}}])
            res.json({
                posts
            })
             */
           Posts.aggregate([
                {$group: {_id : "$topic", count: { $sum: 1 }}}
                ],function (err,result) {
                    if (err) throw err;
                    console.log(result);
                    res.json({result:result})
                });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getPostLimit: async(req, res) => {
        try {

            const features = new APIfeatures(Posts.find().limit(2).sort('-createdAt'), req.query)
        
            const posts = await features.query;
        
            res.json({
                status: 'success',
                result: posts.length,
                posts:posts
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = postCtrl