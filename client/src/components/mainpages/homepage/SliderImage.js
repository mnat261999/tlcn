import React from 'react';
import Slider from "react-slick";


function SliderImage(){

        const banners = {
            infinite: true,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 2000,
            cssEase: "linear"
          };
        return (
            <Slider className="slider" {...banners}>
                <div className="myslide fade slide-1">
                    <div className="txt">
                        <h1>IMAGE 1</h1>
                        <p>Web Devoloper<br />Subscribe To My Channel For More Videos</p>
                    </div>
                </div>
                <div className="myslide fade slide-2">
                    <div className="txt">
                        <h1>IMAGE 2</h1>
                        <p>Web Devoloper<br />Subscribe To My Channel For More Videos</p>
                    </div>
                </div>
            </Slider>
        );
}


export default SliderImage;