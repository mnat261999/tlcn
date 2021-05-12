import React,{useContext,useSelector} from 'react';
import BreadCrumb from '../BreadCumb'
import SearchPet from '../utils/search/SearchPet'
import {GlobalState} from '../../../GlobalState'
import PetItem from '../utils/petItem/PetItem'
import { Row, Col } from 'antd';

function Pets() {
    const state = useContext(GlobalState)
    const [pets, setPets] = state.petsAPI.pets

    console.log('state all pets.js')
    console.log(pets)
    return (
        <>
        <BreadCrumb/>
        <div className='container' style={{marginTop:'100px'}}>
            <SearchPet className='column'/>
            <Row gutter={[16, 16]}>
            {
                pets.map(pet =>{
                    return <PetItem key={pet._id} pet={pet}/>
                })
            }
            </Row>
        </div>
        </>
    );
}

export default Pets;