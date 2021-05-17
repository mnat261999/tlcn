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
                <article className="card">
                    <header className="card__thumb">
                        <Link to={`information/${pet._id}`}><img src= {pet.images.url} alt=''/></Link>
                    </header>
                    <div className="card__body">
                        <div className="card__category"><Link value={pet.status}>{statuses.find(_=>_._id === pet.status).name || ""}</Link></div>
                        <h2 className="card__title"><Link to={`information/${pet._id}`}>{pet.name}</Link></h2>
                        <div className="card__subtitle">Giới tính: {pet.sex}</div>
                        <p className="card__description">{pet.moreinfor}</p>
                    </div>
                </article>
            </Col>
    );
}

export default PetItem;