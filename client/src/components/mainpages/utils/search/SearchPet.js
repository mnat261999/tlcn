import {useState, useEffect,useContext} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../../GlobalState'
import { Row, Col } from 'antd';
import { Select } from 'antd';
import {useHistory, useParams} from 'react-router-dom'

const { Option } = Select;

function SearchPet() {
    const state = useContext(GlobalState)
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')
    const [searchName, setSearchName] = useState('')
    const [statuses,setStatuses] = state.statusesAPI.statuses
    const [types, setTypes] = state.typesAPI.types
    const [pets, setPets] = state.petsAPI.pets
    const [loading, setLoading] = state.petsAPI.loading

    console.log('loading',loading)

    const handleType = e => {
        console.log('e.target.value')
        console.log(e.target.value)
        setType(e.target.value)
    }

    const handleStatus = e => {
        console.log('e.target.value')
        console.log(e.target.value)
        setStatus(e.target.value)
    }

    const handleSearch = e => {
        console.log('e.target.value')
        console.log(e.target.value)
        setSearchName(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault()

            if(type)
            {
                setLoading(true)
                const res = await axios.get(`/api/pets?${type}`)
                console.log(res)
                setLoading(false)
                setPets(res.data.pets)
            }
            if(status)
            {
                setLoading(true)
                const res = await axios.get(`/api/pets?${status}`)
                console.log(res)
                setLoading(false)
                setPets(res.data.pets)
            }
            if(searchName)
            {
                setLoading(true)
                const res = await axios.get(`/api/pets?keyword=${searchName}`)
                console.log(res)
                setLoading(false)
                setPets(res.data.pets)
            }
            else if(type || status || searchName)
            {
                setLoading(true)
                const res = await axios.get(`/api/pets?${type}&${status}&keyword=${searchName}`)
                console.log(res)
                setLoading(false)
                setPets(res.data.pets)
            }else if(!type && !status && !searchName)
            {
                setLoading(true)
                const res = await axios.get('/api/pets')
                setLoading(false)
                setPets(res.data.pets)
            }
    }

    const handleReset  = e => {
        console.log(type, status, searchName)
        setType('')
        setStatus('')
        setSearchName('')
    }

    return (
        <form className='mr-b search-pet' onSubmit={handleSubmit}>
            <Row justify="space-between" gutter={[8, 8]} className='mr-b'>
                <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                <select className="group-search" name="type" value={type} onChange={handleType} >
                    <option value="">All Type</option>
                        {
                            types.map(type => (
                                <option value={"type=" + type._id} key={type._id}>
                                    {type.name}
                                </option>
                        ))
                        }
                </select>
                </Col>

                <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                <select className="group-search" name="type" value={status} onChange={handleStatus} >
                    <option value="">All Status</option>
                        {
                            statuses.map(status => (
                                <option value={"status=" + status._id} key={status._id}>
                                    {status.name}
                                </option>
                        ))
                        }
                </select>
                </Col>
                <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                    <input style={{fontWeight: 400}} className="group-search" type="text" placeholder="Enter your search!" value={searchName} onChange={handleSearch}/>
                </Col>

                <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                    <button className="group-search" type="submit">Search</button>
                </Col>

                <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                    <button className="group-search" type="submit" onClick={handleReset}>All</button>
                </Col>
            </Row>

        </form>
    );
}

export default SearchPet;