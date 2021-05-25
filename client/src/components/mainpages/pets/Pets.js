import React,{useContext} from 'react';
import BreadCrumb from '../BreadCumb'
import SearchPet from '../utils/search/SearchPet'
import {GlobalState} from '../../../GlobalState'
import PetItem from '../utils/petItem/PetItem'
import { Row, Col } from 'antd';
import Loading from '../utils/loading/Loading'
import "aos/dist/aos.css"


function Pets() {
    const state = useContext(GlobalState)
    const [pets, setPets] = state.petsAPI.pets
    const [loading, setLoading] = state.petsAPI.loading

    console.log('state all pets.js')
    console.log(pets)
    return (
        <>
        <div className="bg-gray-100 lg:py-28 h-full pb-96">
            <div className='container'>
                <div className='pt-20'><SearchPet className='column'/></div>
                <Row gutter={[24, 24]}>
                {
                    pets.map(pet =>{
                        return <PetItem key={pet._id} pet={pet} data-aos="fade-right"/>
                    })
                }
                </Row>
            </div>
        </div>
        </>
    );
}

export default Pets;