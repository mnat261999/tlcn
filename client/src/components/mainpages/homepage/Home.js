import React, { Component } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import SliderImage from './SliderImage'
import AboutUs from "./AboutUs"
import Case from "./Case"
import Statistical from "./Statistical"
import News from './News'

function Home(){
        return (
            <>
            <SliderImage/>
            <AboutUs/>
            <Case/>
            <Statistical/>
            <News/>
            </>
        );
}

export default Home;