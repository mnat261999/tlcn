import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import { Row, Col} from 'antd';
import { Avatar } from 'antd';
import Aos from 'aos'
import "aos/dist/aos.css"


function DetailPet() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [pets, setPets] = state.petsAPI.pets
    const [detailPet, setDetailPet] = useState([])
    const [name_pet, setNamePet] = state.petsAPI.name_pet
    const [statuses] = state.statusesAPI.statuses

    const submit = async () => {
        try {
            window.location.href = "https://forms.gle/iVPUAfwN8DTRDY9B7";
        } catch (err) {
            window.location.href = "https://forms.gle/iVPUAfwN8DTRDY9B7";
        }
    }

    console.log('params',params)
    useEffect(() =>{
        Aos.init({duration: 2000}); 
        if(params.id){

            pets.forEach(pet => {
                if(pet._id === params.id){
                    localStorage.setItem('id_pet', pet._id)
                    setDetailPet(pet)
                    setNamePet(pet.name)
                } 
            })
        }
    },[params.id, pets,setNamePet])

    console.log('detailPet',detailPet)

    if(detailPet.length === 0) return null;
    return (
        <>
        <div className='container'>
            <Row gutter={[16, 16]} style={{marginTop:'100px'}} >
                <Col data-aos="zoom-out-right" xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 9}} lx={{span: 9}}><img alt="" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={detailPet.images.url} /></Col>
                <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 15}} lx={{span: 15}}>
                    <div className="flex-wrap content-center ">
                        <h1 className='detail_name text-5xl font-bold'>{detailPet.name}</h1>
                        <ul className='detail_list text-2xl leading-10'>
                            <li><strong>Mã: </strong>{detailPet.pet_code}</li>
                            <li value={detailPet.status}><strong>Trạng thái: </strong>{statuses.find(_=>_._id === detailPet.status).name || ""}</li>
                            <li><strong>Giống: </strong>{detailPet.species}</li>
                            <li><strong>Màu sắc: </strong>{detailPet.color}</li>
                            <li><strong>Cân nặng: </strong>{detailPet.weight} kg</li>
                            <li><strong>Giới tính: </strong>{detailPet.sex}</li>
                            <li><strong>Tiêm phòng: </strong>{detailPet.vaccination}</li>
                            <li><strong>Thông tin thêm: </strong>{detailPet.moreinfor}</li>
                            <li><button className="mt-9 bg-red-500 transition duration-700 ease-in-out ... transform hover:scale-110 text-white font-bold py-3 px-20 rounded-full focus:outline-none" onClick={submit}>
                            Đăng ký nhận nuôi
                        </button></li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </div>
        </>
    );
}

export default DetailPet;