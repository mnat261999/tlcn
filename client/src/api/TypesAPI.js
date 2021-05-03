import {useState, useEffect} from 'react'
import axios from 'axios'

function TypesAPI() {
    const [types, setTypes] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getTypes = async () =>{
            const res = await axios.get('/api/type')
            console.log('type')
            console.log(res)
            setTypes(res.data)
        }

        getTypes()

    },[callback])
    return {
        types: [types, setTypes],
        callback: [callback, setCallback]
    }
}

export default TypesAPI;