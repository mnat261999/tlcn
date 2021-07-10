import {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'

function PetsAPI() {
    const [pets, setPets] = useState([])


    const [pets_slider, setPetsSlider] = useState([])

    const [callback, setCallback] = useState(false)

    const [currentPage, setCurrentPage]= useState(1)
    
    const [petsCount, setPetsCount] = useState('')

    const [resPerPage, setResPerPage] = useState('')

    const [loading, setLoading] = useState(false)

    const [name_pet, setNamePet] = useState('')

    const [numPetByStatus, setNumPetByStatus] = useState([])

    const [page, setPage] = useState(1)

    const [result, setResult] = useState(0)

    const auth = useSelector(state => state.auth)
    const {isAdmin} = auth;
    

    useEffect(() => {

        if(isAdmin === true)
        {
            const getPets = async () => {
                const res = await axios.get(`/api/pets?page=${currentPage}`)
                console.log('test pets')
                console.log(res.data.pets)
                setPets(res.data.pets)
                setPetsCount(res.data.petsCount)
                setResPerPage(res.data.resPerPage)
                setResult(res.data.result)
            }
                getPets()
        }else{
            const getPetsUi = async () => {
                const res = await axios.get(`/api/petsui?limit=${page*8}`)
                console.log('test pets')
                console.log(res.data.pets)
                setPets(res.data.pets)
                setPetsCount(res.data.petsCount)
                setResult(res.data.result)
            }
                getPetsUi()
        }

        const getPetsSlider = async () =>{
            const res = await axios.get('/api/pets/slider')
            console.log('pet slider',res.data.pets)
            setPetsSlider(res.data.pets)
        }

        getPetsSlider()

        const getNumPetByStatus= async () =>{
            const res = await axios.get('/api/pets/num_pets')
            console.log('setNumPetByStatus',res)
            setNumPetByStatus(res.data.result)
        }

        getNumPetByStatus()


    },[callback,currentPage,isAdmin,page])


    return {
        pets: [pets, setPets],
        callback: [callback, setCallback],
        currentPage:[currentPage, setCurrentPage],
        petsCount:[petsCount, setPetsCount],
        resPerPage:[resPerPage, setResPerPage],
        loading:[loading, setLoading],
        name_pet:[name_pet, setNamePet],
        pets_slider: [pets_slider, setPetsSlider],
        numPetByStatus:[numPetByStatus, setNumPetByStatus],
        page:[page, setPage],
        result: [result, setResult]
    }
}

export default PetsAPI;