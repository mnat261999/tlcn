import React from 'react';
import About from './images/about_us.jpg';
import {Link} from 'react-router-dom';


function AboutUs() {
        return (
            <section className="about-us">
                <div className="container">
                    <h1 className="section-heading">About US</h1>
                    <div className="about-us-wrap flex">
                        <div className="flex-1">
                            <img src={About} alt=""/>
                        </div>
                        <div className="flex-1">
                            <h2>Freshmeal is a long established fact that a reader will be distracted</h2>
                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
                                piece of
                                classical Latin literature from 45 BC, making it over 2000 years old. Richard
                                McClintock, a
                                Latin professor at Hampden Sydney College in Virginia, The standard chunk of Lorem
                                Ipsum used
                                since the 1500s is reproduced below for those interested.</p>
                            <Link className="btn btn-secondary">Read More</Link>
                        </div>
                    </div>
                </div>
            </section>

        );
}


export default AboutUs;