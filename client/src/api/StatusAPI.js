import {useState, useEffect} from 'react'
import axios from 'axios'

function StatusAPI() {
    const [statuses, setStatuses] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getStatuses = async () =>{
            const res = await axios.get('/api/status')
            console.log(res)
            setStatuses(res.data)
        }

        getStatuses()
    },[callback])
    return {
        statuses: [statuses, setStatuses],
        callback: [callback, setCallback]
    }
}

export default StatusAPI;