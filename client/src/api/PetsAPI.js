import {useState, useEffect} from 'react'
import axios from 'axios'

function PetsAPI() {
    const [pets, setPets] = useState([])
    const [callback, setCallback] = useState(false)
    const [currentPage, setCurrentPage]= useState(1)
    
    const [petsCount, setPetsCount] = useState('')

    const [resPerPage, setResPerPage] = useState('')
    

    useEffect(() => {
        const getPets = async () => {
        const res = await axios.get(`/api/pets?page=${currentPage}`)
        console.log('test pets')
        console.log(res.data.pets)
        setPets(res.data.pets)
        setPetsCount(res.data.petsCount)
        setResPerPage(res.data.resPerPage)
    }
        getPets()
    },[callback,currentPage])


    return {
        pets: [pets, setPets],
        callback: [callback, setCallback],
        currentPage:[currentPage, setCurrentPage],
        petsCount:[petsCount, setPetsCount],
        resPerPage:[resPerPage, setResPerPage]
    }
}

export default PetsAPI;