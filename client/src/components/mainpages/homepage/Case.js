import React, {useContext,useEffect} from 'react';
import Slider from "react-slick";
import {Link} from 'react-router-dom'
import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {GlobalState} from '../../../GlobalState'
import "aos/dist/aos.css"
import Aos from 'aos'

function Case(){
  const state = useContext(GlobalState)
  const [pets_slider, setPetsSlider] = state.petsAPI.pets_slider
  useEffect(() => {
    Aos.init({duration: 2000}); 
})

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
                    <h1 className="section-heading">Nhận nuôi</h1>
                        <Slider className="slider-adoption" {...slider_adopt}>
                          {
                            pets_slider.map((pet)=>(
                              <Link to={`adoption/${pet._id}`} data-aos="flip-left" data-aos-easing="ease-out-cubic">
                                <div className="img-card bg-white transition duration-700 ease-in-out ... transform hover:scale-110 motion-reduce:transform-none ...">
                                  <img className="img" src={pet.images.url} alt="" />
                                  <div class="card-body">
                                      <div className="py-4">
                                        <span value={pet.pet_code} className="inline-block bg-pink-200 rounded-full px-3 py-1 text-xl font-semibold text-pink-700 mr-2">#{pet.pet_code}</span>
                                        <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-xl font-semibold text-green-700">#{pet.sex}</span>
                                      </div>
                                      <Link to={`adoption/${pet._id}`}><div className="card-title text-yellow-700">{pet.name}</div></Link>
                                  </div>
                                </div>
                              </Link>
                            ))
                          }
                       
                        </Slider>
                    </div>

            </section>
        );
}


export default Case;