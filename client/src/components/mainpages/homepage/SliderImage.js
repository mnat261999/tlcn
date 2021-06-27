import React from 'react';
import Slider from "react-slick";


function SliderImage(){

        const banners = {
            infinite: true,
            fade: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 5000,
            autoplaySpeed: 5000,
            cssEase: "linear"
          };
        return (
            <Slider className="slider" {...banners}>
                <div className="myslide fade slide-3">
                    <div className="txt">
                        <h1>IMAGE 1</h1>
                        <p>Web Devoloper<br />Subscribe To My Channel For More Videos</p>
                    </div>
                </div>
                <div className="myslide fade slide-4">
                    <div className="txt">
                        <h1>IMAGE 2</h1>
                        <p>Web Devoloper<br />Subscribe To My Channel For More Videos</p>
                    </div>
                </div>
                <div className="myslide fade slide-5">
                    <div className="txt">
                        <h1>IMAGE 3</h1>
                        <p>Web Devoloper<br />Subscribe To My Channel For More Videos</p>
                    </div>
                </div>
            </Slider>
        );
}


export default SliderImage;