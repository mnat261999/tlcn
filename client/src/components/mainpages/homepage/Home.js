import React, { Component } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import SliderImage from './SliderImage'
import AboutUs from "./AboutUs"
import Case from "./Case"

function Home(){
        return (
            <>
            <SliderImage/>
            <AboutUs/>
            <Case/>
            </>
        );
}

export default Home;