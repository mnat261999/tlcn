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
                        <p>Những chú chó cưng không phải là toàn bộ cuộc sống của ta<br />nhưng lại là một mảnh ghép không thể thiếu.</p>
                    </div>
                </div>
                <div className="myslide fade slide-4">
                    <div className="txt">
                        <h1>IMAGE 2</h1>
                        <p>Chú chó của bạn là điều duy nhất trên Trái Đất<br />yêu bạn hơn yêu chính nó.</p>
                    </div>
                </div>
                <div className="myslide fade slide-5">
                    <div className="txt">
                        <h1>IMAGE 3</h1>
                        <p>Khi bạn cứu một chú chó,<br /> có thể điều đó sẽ không là gì trong thế giới của bạn,<br />nhưng bạn đã thay đổi thế giới của chúng rồi.</p>
                    </div>
                </div>
            </Slider>
        );
}


export default SliderImage;