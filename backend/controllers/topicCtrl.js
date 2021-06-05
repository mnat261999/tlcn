const Topic = require('../models/topicModel')
const Posts = require('../models/postModel')

const topicCtrl ={
    createTopic: async (req, res) =>{
        try {
            // if user have role = 1 ---> admin
            // only admin can create , delete and update category
            const {name} = req.body;
            const topic = await Topic.findOne({name})
            if(topic) return res.status(400).json({msg: "This topic already exists."})

            const newTopic = new Topic({name})

            await newTopic.save()
            res.json({msg: "Created a topic"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteTopic: async(req, res) =>{
        try {
            const posts = await Posts.findOne({topic: req.params.id})
            if(posts) return res.status(400).json({
                msg: "Please delete all posts with a relationship."
            })
            await Topic.findByIdAndDelete(req.params.id)
            console.log(req.params.id)
            res.json({msg: "Deleted a Topic"}) 
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateTopic: async(req, res) =>{
        try {
            const {name} = req.body;
            await Topic.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a topic"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getTopics: async(req, res) =>{
        try {
            const topics = await Topic.find()
            res.json(topics)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = topicCtrl