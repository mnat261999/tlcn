import {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'

function MyPostsAPI(token) {
    const [myPosts, setMyPosts] = useState([])
    const [callback, setCallback] = useState(false)
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState('')
    const [all, setALL] = useState(0)
    const [numPostByTopic, setNumPostByTopic] = useState([])
    const [title, setTitle] = useState('')
    const [posts_slider, setPostsSlider] = useState([])
    const auth = useSelector(state => state.auth)
    const {isAdmin} = auth;
    console.log(auth.isAdmin)

    useEffect(() =>{
        //console.log("token",token)
        
        if(token){
            //console.log("isAdmin",isAdmin)
            if(isAdmin === true){
                console.log("isAdmin",isAdmin)
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
            else{
                //console.log("isAdmin",isAdmin)
                const getPosts = async () =>{
                    const res = await axios.get(`/api/posts`)
                    console.log('test Posts')
                    console.log(res.data)
                    setALL(res.data.postsCount)
                    setPosts(res.data.posts)
                }
    
                getPosts()
            }
        }
        else
        {
            //console.log("isAdmin",isAdmin)
            const getPosts = async () =>{
                const res = await axios.get(`/api/posts`)
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

            const getPostsSlider = async () =>{
                const res = await axios.get('/api/posts/slider')
                console.log('post slider',res.data.posts)
                setPostsSlider(res.data.posts)
            }
    
            getPostsSlider()
        }
    },[token,callback,filter,isAdmin])

    return {
        myPosts: [myPosts, setMyPosts],
        callback: [callback, setCallback],
        posts: [posts, setPosts],
        filter:[filter, setFilter],
        all:[all, setALL],
        numPostByTopic:[numPostByTopic, setNumPostByTopic],
        title: [title, setTitle],
        posts_slider: [posts_slider, setPostsSlider]
    }
}

export default MyPostsAPI;