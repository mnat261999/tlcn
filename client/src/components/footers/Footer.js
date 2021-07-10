import React from 'react';
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom';

function Footer() {
    const home = async() => {
        window.location.href = '/';
    }
    const adoption = async() => {
        window.location.href = '/adoption';
    }
    const product = async() => {
        window.location.href = '/product';
    }
    const news = async() => {
        window.location.href = '/news';
    }
    return (
        <footer>
            <div className="container">
                <Row gutter={[16, 16]}>
                    <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 8}} lx={{span: 8}} >
                        <div className="box">
                            <h3 className="text-center text-white text-4xl">About us</h3>
                            <p className="leading-10 text-center text-white text-2xl">It was popularised in the 1960 with the release of Latest sheets containing Lorem Ipsum
                            passage.</p>
                            <div className="text-center"><button className="mt-9 btn-secondary transition duration-700 ease-in-out ... transform hover:scale-110 text-white font-bold py-3 px-20 rounded-full focus:outline-none">
                            Đọc thêm</button></div>
                        </div>
                    </Col>

                    <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 8}} lx={{span: 8}} >
                        <div className="box">
                            <h3 className="text-center text-white text-4xl">Quik Links</h3>
                                <ul className="text-center">
                                    <li className="mb-4 text-2xl">
                                        <Link onClick={home} className="text-white">Trang chủ</Link>
                                    </li>
                                    <li className="mb-4 text-2xl">
                                        <Link onClick={adoption} className="text-white">Nhận nuôi</Link>
                                    </li>
                                    <li className="mb-4 text-2xl">
                                        <Link onClick={product} className="text-white">Sản phẩm</Link>
                                    </li>
                                    <li className="mb-4 text-2xl">
                                        <Link onClick={news} className="text-white">Tin tức</Link>
                                    </li>
{/*                                     <li className="mb-4 text-2xl">
                                        <Link className="text-white">Liên hệ</Link>
                                    </li> */}
                               </ul>
                        </div>
                    </Col>
                    <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 8}} lx={{span: 8}} >
                        <div className="box">
                            <h3 className="text-center text-white text-4xl">Follow Us</h3>
                            <div>
                                <ul className="text-center">
                                <li className="mb-4 text-2xl">
                                    <Link className="text-white">
                                    <span>Facebook</span>
                                    </Link>
                                </li>
                                <li className="mb-4 text-2xl">
                                    <Link className="text-white">
                                    <span>Twitter</span>
                                    </Link>
                                </li>
                                <li className="mb-4 text-2xl">
                                    <Link className="text-white">
                                    <span>Google +</span>
                                    </Link>
                                </li>
                                <li className="mb-4 text-2xl">
                                    <Link className="text-white">
                                    <span>Instagram</span>
                                    </Link>
                                </li>
                                </ul>
                            </div>
                        </div>
                    </Col>

                </Row>

            </div>
        </footer>
    );
}

export default Footer;