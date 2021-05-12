import {useState, useEffect} from 'react'
import axios from 'axios'

function MyPostsAPI(token) {
    const [myPosts, setMyPosts] = useState([])
    const [callback, setCallback] = useState(false)
    const [posts, setPosts] = useState([])

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
                const res = await axios.get('/api/posts')
                console.log('test Posts')
                console.log(res.data.posts)
                setPosts(res.data.posts)
            }

            getPosts()
        }
    },[token,callback])

    return {
        myPosts: [myPosts, setMyPosts],
        callback: [callback, setCallback],
        posts: [posts, setPosts]
    }
}

export default MyPostsAPI;