import {useState, useEffect} from 'react'
import axios from 'axios'

function MyPostsAPI(token) {
    const [myPosts, setMyPosts] = useState([])
    const [callback, setCallback] = useState(false)
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState('')
    const [all, setALL] = useState(0)
    const [numPostByTopic, setNumPostByTopic] = useState([])

    useEffect(() =>{
        if(token){
            const getMyPosts = async () => {
                const res = await axios.get('/api/admin/my_posts', {
                    headers: {Authorization: token}
                })
                console.log('test myPosts')
                console.log(res)
                setMyPosts(res.data.myPosts)
            }    
            getMyPosts() 
        }
        else
        {
            const getPosts = async () =>{
                const res = await axios.get(`/api/posts${filter}`)
                console.log('test Posts')
                console.log(res.data)
                setALL(res.data.postsCount)
                setPosts(res.data.posts)
            }

            getPosts()

            const getNumPostByTopic= async () =>{
                const res = await axios.get('/api/posts/num_posts')
                console.log('setNumPostTopics',res)
                setNumPostByTopic(res.data.result)
            }

            getNumPostByTopic()
        }
    },[token,callback,filter])

    return {
        myPosts: [myPosts, setMyPosts],
        callback: [callback, setCallback],
        posts: [posts, setPosts],
        filter:[filter, setFilter],
        all:[all, setALL],
        numPostByTopic:[numPostByTopic, setNumPostByTopic]
    }
}

export default MyPostsAPI;