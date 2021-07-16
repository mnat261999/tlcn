import React,{useEffect,useContext,useState} from 'react';
import './productItem.css'
import {Link} from 'react-router-dom'
import Aos from 'aos'
import "aos/dist/aos.css"
import { Pagination } from 'antd';
import {GlobalState} from '../../../../GlobalState'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ProductItem({product}) {
    const state = useContext(GlobalState)
    const [currentPage, setCurrentPage]= useState(1)
    const [resPerPage, setResPerPage] = useState(8)
    const [minIndex, setMinIndex] = useState(0)
    const [maxIndex, setMaxIndex] = useState(resPerPage)

    const onChange = page => {
        console.log('page');
        console.log(page);
        setCurrentPage(page)
        setMinIndex((page - 1)* resPerPage) 
        setMaxIndex(page* resPerPage)
      };

    useEffect(()=>{
        Aos.init({duration: 2000}); 
    })
    return (
        <>
            <h1 data-aos="fade-up" data-aos-easing="ease-out-cubic" className='pt-20 text-5xl'>{product.name}</h1>
            {
                product.children.map(_ =>(
                    <>
                    <div data-aos="fade-up" data-aos-easing="ease-out-cubic" key={_._id} className="group-products-type">
                        <h3 className="text-3xl">
                            {
                                _.nameType === "product" && _.name || ""
                            }
                        </h3>
                        <div className="products-type">
                        {
                           
                           _.group_list_product.length > 0 && resPerPage <= _.group_list_product.length &&
                            _.group_list_product.map((group,index )=>index >= minIndex &&
                            index < maxIndex && (
                                <>
                                <div className="item-products-type" data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                    <Link to={`product/${group._id}`}>
                                        <div className="ig-products-type">
                                            <img src={group.images.url} alt=""></img>
                                        </div>
                                        <div className="name-products-type">
                                            <p>{group.content}</p>
                                        </div>
                                    </Link>
                                    <div className="price-products-type">
                                        <div className="group-price">
                                            <span>{numberWithCommas(group.price)} <u>đ</u></span>
                                        </div>
                                    </div>
                                </div>
                                </>
                            )) ||
                            _.group_list_product.length > 0 && resPerPage > _.group_list_product.length &&
                            _.group_list_product.map((group)=>(
                                <>
                                <div className="item-products-type" data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                    <Link to={`product/${group._id}`}>
                                        <div className="ig-products-type">
                                            <img src={group.images.url} alt=""></img>
                                        </div>
                                        <div className="name-products-type">
                                            <p>{group.content}</p>
                                        </div>
                                    </Link>
                                    <div className="price-products-type">
                                        <div className="group-price">
                                            <span>{numberWithCommas(group.price)} <u>đ</u></span>
                                        </div>
                                    </div>
                                </div>
                                </>
                            )) || <p className="text-2xl">Không có sản phẩm để hiển thị</p>

                            /* _.nameType === "product" &&  _.productsList.find(product=>product.category) &&  _.productsList.find(product=>product.category === _.id) && "1" || "0" */
                        }                    
                        </div>

                        <div className="product-pagination">
                        {
                            resPerPage <= _.group_list_product.length && (<Pagination key={_._id} defaultCurrent={1}
                            defaultPageSize={resPerPage}  total={_.group_list_product.length} onChange={onChange}/>)|| ""
                        }
                        </div> 
                    </div>  
                    </>
                
                ))
            }
        </>
    );
}

export default ProductItem;