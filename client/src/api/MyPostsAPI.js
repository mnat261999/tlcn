import {useState, useEffect} from 'react'
import axios from 'axios'

function MyPostsAPI(token) {
    const [myPosts, setMyPosts] = useState([])
    const [callback, setCallback] = useState(false)

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
    },[token,callback])

    return {
        myPosts: [myPosts, setMyPosts],
        callback: [callback, setCallback]
    }
}

export default MyPostsAPI;