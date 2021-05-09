import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { Row, Col } from 'antd';
import './css/createProduct.css'
import './css/form.css'

const initialState = {
    pet_code:'',
    name: '',
    type: '',
    color: '',
    weight: '',
    sex: '',
    vaccination: '',
    moreinfor:'',
    status:'',
    _id: ''
}

function CreatePet() {
    const state = useContext(GlobalState)
    const [pet, setPet] = useState(initialState)
    const [types] = state.typesAPI.types
    const [statuses] = state.statusesAPI.statuses
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)

    const auth = useSelector(state => state.auth)
    const {isAdmin} = auth
    const token = useSelector(state => state.token)

    //const [isAdmin] = state.userAPI.isAdmin
    //const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [pets] = state.petsAPI.pets
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.petsAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            pets.forEach(pet => {
                if(pet._id === param.id) {
                    setPet(pet)
                    setImages(pet.images)
                }
            })
        }else{
            setOnEdit(false)
            setPet(initialState)
            setImages(false)
        }
    }, [param.id, pets])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_pet', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy_admin', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setPet({...pet, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/api/admin/pet/${pet._id}`, {...pet, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/admin/pet/new', {...pet, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/admin/all_pet")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

    return (
        <>
            <h2>{onEdit? "Update Pet" : "Create Pet"}</h2>
            <div className="create_product">
                <Row gutter={[48, 16]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    <div className="upload">
                        <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                        {
                            loading ? <div id="file_load"><Loading /></div>

                            :<div id="file_img" style={styleUpload}>
                                <img src={images ? images.url : ''} alt=""/>
                                <span className="cancel" onClick={handleDestroy}>X</span>
                            </div>
                        }
                        
                    </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                        <form className='card' onSubmit={handleSubmit}>
                            <div className="group">
                                <label htmlFor="pet_code">Pet Code</label>
                                <input class="group-control" type="text" name="pet_code" id="pet_code" required
                                value={pet.pet_code} onChange={handleChangeInput} />
                            </div>

                            <div className="group">
                                <label htmlFor="name">Name</label>
                                <input class="group-control" type="text" name="name" id="name" required
                                value={pet.name} onChange={handleChangeInput} />
                            </div>

                            <div className="group">
                                <label htmlFor="color">Color</label>
                                <input class="group-control" type="text" name="color" id="color" required
                                value={pet.color} onChange={handleChangeInput} />
                            </div>

                            <div className="group">
                                <label htmlFor="weight">Weight</label>
                                <input class="group-control" type="number" name="weight" id="weight" required
                                value={pet.weight} onChange={handleChangeInput} />
                            </div>

                            <div className="group">
                                <label htmlFor="sex">Sex</label>
                                <input class="group-control" type="text" name="sex" id="sex" required
                                value={pet.sex} onChange={handleChangeInput} />
                            </div>

                            <div className="group">
                                <label htmlFor="vaccination">Vaccination</label>
                                <input class="group-control" type="text" name="vaccination" id="vaccination" required
                                value={pet.vaccination} onChange={handleChangeInput} />
                            </div>

                            <div className="group">
                                <label htmlFor="moreinfor">More Information</label>
                                <textarea class="group-control" type="text" name="moreinfor" id="moreinfor" required
                                value={pet.moreinfor} rows="7" onChange={handleChangeInput} />
                            </div>

                            <div className="group">
                                <label htmlFor="type">Types: </label>
                                <select class="group-control" name="type" value={pet.type} onChange={handleChangeInput} >
                                    <option value="">Please select a type</option>
                                    {
                                        types.map(type => (
                                            <option value={type.name} key={type._id}>
                                                {type.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="group">
                                <label htmlFor="status">Status: </label>
                                <select class="group-control" name="status" value={pet.status} onChange={handleChangeInput} >
                                    <option value="">Please select a status</option>
                                    {
                                        statuses.map(status => (
                                            <option value={status.name} key={status._id}>
                                                {status.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <button className="btn" type="submit">{onEdit? "Update" : "Create"}</button>
                        </form>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default CreatePet;