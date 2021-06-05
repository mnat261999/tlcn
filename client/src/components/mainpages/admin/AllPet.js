import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import { Avatar } from 'antd';
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './css/alluser.css'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import SearchPet from '../utils/search/SearchPet'
import { Pagination } from 'antd';
import { Row, Col } from 'antd';

function AllPet() {
    const state = useContext(GlobalState)
    const [pets, setPets] = state.petsAPI.pets
    const [loading, setLoading] = useState(false)
    const token = useSelector(state => state.token)
    const [callback, setCallback] = state.petsAPI.callback
    const [currentPage, setCurrentPage] = state.petsAPI.currentPage
    const [petsCount, setPetsCount] = state.petsAPI.petsCount
    const [resPerPage, setResPerPage] = state.petsAPI.resPerPage
    const [types] = state.typesAPI.types
    const [statuses] = state.statusesAPI.statuses

    console.log('state all pets')
    console.log(resPerPage)
 
    const onChange = page => {
        console.log('page');
        console.log(page);
        setCurrentPage(page)
      };

    const deletePet = async(id, public_id) => {
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroy_admin', {public_id},{
                headers: {Authorization: token}
            })
            const deletePet = axios.delete(`/api/admin/pet/${id}`, {
                headers: {Authorization: token}
            })

            await destroyImg
            await deletePet
            setCallback(!callback)
            setLoading(false)
            alert('Delete is successful')
        } catch (err) {
            alert(err.response.data.msg)
        }
    }



    return (
        <>
            <div className="col-right">
                <h2>All Pets</h2>
                <SearchPet/>
                <div style={{overflowX: "auto"}} className="mr-b">
                    <table className="customers">
                        <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Pet Code</th>
                                    <th>Name</th>
                                    <th>Species</th>
                                    <th>Type</th>
                                    <th>Color</th>
                                    <th>Weight</th>
                                    <th>Sex</th>
                                    <th>Vaccination</th>
                                    <th>More Information</th>
                                    <th>Status</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                        </thead>
                                <tbody>
                                    {
                                        pets.map((pet)=>(
                                            <tr key={pet._id}>
                                                <td>{pet._id}</td>
                                                <td>{pet.pet_code}</td>
                                                <td>{pet.name}</td>
                                                <td>{pet.species}</td>
                                                <td value={pet.type}>{types.find(_=>_._id === pet.type).name || ""}</td>
                                                <td>{pet.color}</td>
                                                <td>{pet.weight}</td>
                                                <td>{pet.sex}</td>
                                                <td>{pet.vaccination}</td>
                                                <td>{pet.moreinfor}</td>
                                                <td value={pet.status}>{statuses.find(_=>_._id === pet.status).name || ""}</td>
                                                <td> <Avatar shape="square" size={64} src={pet.images.url}/></td>
                                                <td>
                                                <Link to={`/admin/edit_pet/${pet._id}`}>
                                                    <i className="fas fa-edit" title="Edit"></i>
                                                </Link>
                                                <i className="fas fa-trash-alt" title="Remove" onClick={() => deletePet(pet._id,pet.images.public_id)} ></i>
                                            </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                    </table>
                </div>
          </div>
          
                {
                    resPerPage <= petsCount && (<Pagination defaultCurrent={1}
                        defaultPageSize={resPerPage}  total={petsCount} onChange={onChange}/>)
                }
        </>
    );
}

export default AllPet;