import React, {useContext,useEffect} from 'react'
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'
import Aos from 'aos'
import "aos/dist/aos.css"

function PetItem({pet}) {
    const state = useContext(GlobalState)
    const [statuses] = state.statusesAPI.statuses
    const [types] = state.typesAPI.types
    useEffect(()=>{
        Aos.init({duration: 2000}); 
    })
    return (
            <Col xs={24} sm={24} md={12} lg={12} xl={6} data-aos="fade-up" data-aos-easing="ease-out-cubic">
                <Link to={`adoption/${pet._id}`}>
                <div className="rounded overflow-hidden shadow-lg transition duration-700 ease-in-out ... transform hover:scale-110 motion-reduce:transform-none ...">
                    <Link to={`adoption/${pet._id}`}><img  className="w-full" src={pet.images.url} alt="" /></Link>
                    <div className="px-6 py-4">
                        <span value={pet.status} className="inline-block bg-pink-200 rounded-full px-3 py-1 text-xl font-semibold text-pink-700 mr-2">#{statuses.find(_=>_._id === pet.status).name || ""}</span>
                        <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-xl font-semibold text-green-700">#{pet.sex}</span>
                    </div>
                    <div className="px-6 py-4">
                        <Link to={`adoption/${pet._id}`}><div className="font-bold text-4xl mb-2 text-yellow-700 hover:text-yellow-500">{pet.name}</div></Link>
                        <p className="text-gray-700 text-xl truncate ...">
                        {pet.moreinfor}
                        </p>
                    </div>
                </div>
                </Link>
            </Col>
    );
}

export default PetItem;