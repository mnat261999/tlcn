import React from 'react';
import Slider from "react-slick";
import { Card } from 'antd';
import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Case(){
        const slider_adopt = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                  }
                },
                {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      infinite: true,
                      dots: false
                    }
                  },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        };
        return (
            <section className="adoptions">
                <div className="container">
                    <h1 className="section-heading">Adoption</h1>
                        <Slider className="slider-adoption" {...slider_adopt}>
                        <div className="img-card">
                            <img className="img" src="https://res.cloudinary.com/lucy123/image/upload/v1609064122/test/a4vpdhuurrjgzndn38o6.jpg" alt="" />
                            <div class="card-body">
                                <div className="card-title">kkkk</div>
                                <div className="card-text">kkk</div>
                            </div>
                        </div>

                        <div className="img-card">
                            <img className="img" src="https://res.cloudinary.com/lucy123/image/upload/v1609064122/test/a4vpdhuurrjgzndn38o6.jpg" alt="" />
                            <div class="card-body">
                                <div className="card-title">kkkk</div>
                                <div className="card-text">kkkk</div>
                            </div>
                        </div>

                        <div className="img-card">
                            <img className="img" src="https://res.cloudinary.com/lucy123/image/upload/v1609064122/test/a4vpdhuurrjgzndn38o6.jpg" alt="" />
                            <div class="card-body">
                                <div className="card-title">kkkk</div>
                                <div className="card-text">kkkk</div>
                            </div>
                        </div>

                        <div className="img-card">
                            <img className="img" src="https://res.cloudinary.com/lucy123/image/upload/v1609064122/test/a4vpdhuurrjgzndn38o6.jpg" alt="" />
                            <div class="card-body">
                                <div className="card-title">kkkk</div>
                                <div className="card-text">kkkk</div>
                            </div>
                        </div>

                        <div className="img-card">
                            <img className="img" src="https://res.cloudinary.com/lucy123/image/upload/v1609064122/test/a4vpdhuurrjgzndn38o6.jpg" alt="" />
                            <div class="card-body">
                                <div className="card-title">kkkk</div>
                                <div className="card-text">kkkk</div>
                            </div>
                        </div>

                        <div className="img-card">
                            <img className="img" src="https://res.cloudinary.com/lucy123/image/upload/v1609064122/test/a4vpdhuurrjgzndn38o6.jpg" alt="" />
                            <div class="card-body">
                                <div className="card-title">kkkk</div>
                                <div className="card-text">kkkk</div>
                            </div>
                        </div>
                        </Slider>
                    </div>

            </section>
        );
}


export default Case;