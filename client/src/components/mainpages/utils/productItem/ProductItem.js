import React from 'react';
import './productItem.css'
import {Link} from 'react-router-dom'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ProductItem({product}) {
    return (
        <>
            <h1 className='pt-20 text-5xl'>{product.name}</h1>
            {
                product.children.map(_ =>(
                    <div key={_.id} className="group-products-type">
                        <h3 className="text-3xl">
                            {
                                _.nameType === "product" && _.name || ""
                            }
                        </h3>
                        <div className="products-type">
                        {
                            _.group_list_product.length > 0 &&
                            _.group_list_product.map(group =>(
                                
                                <div className="item-products-type">
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