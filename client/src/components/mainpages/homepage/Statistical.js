import React,{useContext,useEffect} from 'react';
import { Row, Col } from 'antd';
import Health from './images/health.png'
import House from './images/house.png'
import {GlobalState} from '../../../GlobalState'
import "aos/dist/aos.css"
import Aos from 'aos'

function Statistical() {
    const state = useContext(GlobalState)
    const [petsCount, setPetsCount] = state.petsAPI.petsCount
    const [numPetByStatus, setNumPetByStatus]  = state.petsAPI.numPetByStatus
    

    useEffect(() => {
        Aos.init({duration: 2000}); 
    })
    

    var arrStatus = [];
    //first elem
    arrStatus.push({count: petsCount, strStatus: "Ca cứu hộ",  objImg: {img: Health}});
    //
    var arrImg = [{img: Health}];
    for (let i = 0; i < numPetByStatus.length; i++) {
        const e = numPetByStatus[i];
         var objImg = arrImg[(i < arrImg.length)? i: arrImg.length-1];
        arrStatus.push({count: e.pet_list.length, strStatus: e.name,  objImg: objImg});
    }

    // Split in group of 3 items
    var _arrStatus = chunkArray(arrStatus, 3);
    var arrStatus3 = _arrStatus.slice(0,_arrStatus.length-1);
    var StatusLast = _arrStatus[_arrStatus.length-1];
    if(StatusLast.length === 3){
        arrStatus3 = _arrStatus;
        StatusLast = [];
    }

    return (
        <section className="static">
            <div className="container">
                <div className="number">
                    {
                        //n-1 hàng đầu
                        arrStatus3.map((rowStatus) => (
                            <Row gutter={[16, 16]}>
                                {
                                    rowStatus.map((status) => (
                                        <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 8}} lx={{span: 8}} data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                            <div className="text-center items-center relative number-item">
                                                <div className="bg-white p-12 rounded-full inline-block mb-2"><img src={status.objImg.img} alt =""/></div>
                                                <h1 className="mb-0 text-white text-8xl">{status.count}</h1>
                                                <p className="text-white text-3xl mt-2">{status.strStatus}</p>
                                            </div>
                                        </Col>
                                    ))//rowStatus.map(
                                }
                            </Row>
                        ))//arrStatus3.map(
                    }
                    {
                        //hàng cuối
                        <Row className="px-80 mt-3">
                        {
                            StatusLast.map(function(status){
                                //
                                if(StatusLast.length === 1)
                                return <>
                                    <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 24}} lx={{span: 24}} data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                        <div className="text-center items-center relative number-item">
                                            <div className="bg-white p-12 rounded-full inline-block mb-2"><img src={status.objImg.img} alt =""/></div>
                                            <h1 className="mb-0 text-white text-8xl">{status.count}</h1>
                                            <p className="text-white text-3xl mt-2">{status.strStatus}</p>
                                        </div>
                                    </Col>
                                </>
                                ;
                                //
                                if(StatusLast.length === 2)
                                return <>
                                    <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 12}} lx={{span: 12}} data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                        <div className="text-center items-center relative number-item">
                                            <div className="bg-white p-12 rounded-full inline-block mb-2"><img src={status.objImg.img} alt =""/></div>
                                            <h1 className="mb-0 text-white text-8xl">{status.count}</h1>
                                            <p className="text-white text-3xl mt-2">{status.strStatus}</p>
                                        </div>
                                    </Col>
                                </>
                                ;
                            }
                            )//rowStatus.map(
                        }
                        </Row>
                    }
                </div>
            </div>
        </section>
    );


    function chunkArray(myArray, chunk_size){
        var index = 0;
        var arrayLength = myArray.length;
        var tempArray = [];
        
        for (index = 0; index < arrayLength; index += chunk_size) {
            var myChunk = myArray.slice(index, index+chunk_size);
            // Do something if you want with the group
            tempArray.push(myChunk);
        }
        return tempArray;
    }
}

export default Statistical;