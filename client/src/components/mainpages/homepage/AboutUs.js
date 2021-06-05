import React,{useEffect} from 'react';
import About from './images/about_us.jpg';
import "aos/dist/aos.css"
import Aos from 'aos'


function AboutUs() {
    useEffect(() => {
        Aos.init({duration: 2000}); 
    })
        return (
            <section className="about-us">
                <div className="container">
                    <h1 className="section-heading">Về chúng tôi</h1>
                    <div className="about-us-wrap flex">
                        <div className="flex-1" data-aos="fade-right">
                            <img src={About} alt=""/>
                        </div>
                        <div className="flex-1" data-aos="fade-left">
                            <h2>Freshmeal is a long established fact that a reader will be distracted</h2>
                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
                                piece of
                                classical Latin literature from 45 BC, making it over 2000 years old. Richard
                                McClintock, a
                                Latin professor at Hampden Sydney College in Virginia, The standard chunk of Lorem
                                Ipsum used
                                since the 1500s is reproduced below for those interested.</p>
                                <button className="mt-9 btn-secondary transition duration-700 ease-in-out ... transform hover:scale-110 text-white font-bold py-3 px-20 rounded-full focus:outline-none">
                                Đọc thêm</button>
                        </div>
                    </div>
                </div>
            </section>

        );
}


export default AboutUs;