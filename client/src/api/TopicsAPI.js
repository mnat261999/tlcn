import {useState, useEffect} from 'react'
import axios from 'axios'

function TopicsAPI() {
    const [topics, setTopics] = useState([])
    const [callback, setCallback] = useState(false)
    useEffect(() =>{
        const getTopics = async () =>{
            const res = await axios.get('/api/topic')
            console.log('topic all',res)
            setTopics(res.data)
        }

        getTopics()
    },[callback])
    return {
        topics: [topics, setTopics],
        callback: [callback, setCallback]
    }
}

export default TopicsAPI;