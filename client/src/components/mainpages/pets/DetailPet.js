import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import { Row, Col} from 'antd';
import { Avatar } from 'antd';


function DetailPet() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [pets, setPets] = state.petsAPI.pets
    const [detailPet, setDetailPet] = useState([])

    console.log('params',params)
    useEffect(() =>{
        if(params.id){

            pets.forEach(pet => {
                if(pet._id === params.id) setDetailPet(pet)
            })
        }
    },[params.id, pets])

    console.log('detailPet',detailPet)

    if(detailPet.length === 0) return null;
    return (
        <>
        <div className='container'>
            <Row gutter={[48, 48]}  style={{marginTop:'100px'}} >
                <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 12}} lx={{span: 8}}><img alt="" src={detailPet.images.url}/></Col>
                <Col  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 12}} lx={{span: 16}}>
                    <h1 className='detail_name'>{detailPet.name}</h1>
                    <ul className='detail_list'>
                        <li><strong>Giống: </strong>{detailPet.species}</li>
                        <li><strong>Màu sắc: </strong>{detailPet.color}</li>
                        <li><strong>Cân nặng: </strong>{detailPet.weight}</li>
                        <li><strong>Giới tính: </strong>{detailPet.sex}</li>
                        <li><strong>Tiêm phòng: </strong>{detailPet.vaccination}</li>
                        <li><strong>Thông tin thêm: </strong>{detailPet.moreinfor}</li>
                    </ul>
                </Col>
            </Row>
        </div>
        </>
    );
}

export default DetailPet;