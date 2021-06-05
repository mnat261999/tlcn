import React,{useEffect} from 'react';
import './productItem.css'
import {Link} from 'react-router-dom'
import Aos from 'aos'
import "aos/dist/aos.css"

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ProductItem({product}) {
    useEffect(()=>{
        Aos.init({duration: 2000}); 
    })
    return (
        <>
            <h1 data-aos="fade-up" data-aos-easing="ease-out-cubic" className='pt-20 text-5xl'>{product.name}</h1>
            {
                product.children.map(_ =>(
                    <div data-aos="fade-up" data-aos-easing="ease-out-cubic" key={_.id} className="group-products-type">
                        <h3 className="text-3xl">
                            {
                                _.nameType === "product" && _.name || ""
                            }
                        </h3>
                        <div className="products-type">
                        {
                            _.group_list_product.length > 0 &&
                            _.group_list_product.map(group =>(
                                
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
                            )) || <p className="text-2xl">Không có sản phẩm để hiển thị</p>
                        }
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default ProductItem;