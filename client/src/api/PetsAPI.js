import {useState, useEffect} from 'react'
import axios from 'axios'

function PetsAPI() {
    const [pets, setPets] = useState([])
    const [callback, setCallback] = useState(false)

    

    useEffect(() => {
        const getPets = async () => {
        const res = await axios.get('/api/pets')
        console.log('test pets')
        console.log(res.data.pets)
        setPets(res.data.pets)
    }
        getPets()
    },[callback])


    return {
        pets: [pets, setPets],
        callback: [callback, setCallback]
    }
}

export default PetsAPI;