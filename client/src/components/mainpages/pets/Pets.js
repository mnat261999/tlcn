import React,{useContext} from 'react';
import BreadCrumb from '../BreadCumb'
import SearchPet from '../utils/search/SearchPet'
import {GlobalState} from '../../../GlobalState'
import PetItem from '../utils/petItem/PetItem'
import { Row, Col } from 'antd';
import Loading from '../utils/loading/Loading'
import "aos/dist/aos.css"
import InfiniteScroll from 'react-infinite-scroll-component';

function Pets() {
    const state = useContext(GlobalState)
    const [pets, setPets] = state.petsAPI.pets
    const [page, setPage] = state.petsAPI.page
    const [result, setResult] = state.petsAPI.result
    

     
    console.log('state all pets.js')
    console.log(pets)
    return (
        <>
        <div className="bg-gray-100 lg:py-28 h-full pb-96">
            <div className='container'>
                <div className='pt-20'><SearchPet className='column'/></div>
                <InfiniteScroll 
                    dataLength={pets.length} //This is important field to render the next data
                    next={result < page * 8 ? "":() => setPage(page+1)}
                    hasMore={result < page * 8 ? false :true}
                    loader={ result < page * 8 ? "":<h3 className="text-center mt-6">Loading...</h3>}
                    endMessage={
                        <p className="text-center mt-6">
                            <b>You have seen it all</b>
                        </p>
                    }
                >
                <Row gutter={[24, 24]}>
                {
                    pets.map(pet =>{
                        return <PetItem key={pet._id} pet={pet} data-aos="fade-right"/>
                    })
                }
                </Row>
                </InfiniteScroll>
            </div>
        </div>
        </>
    );
}

export default Pets;