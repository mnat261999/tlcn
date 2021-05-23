import React from 'react';
import { htmlToText } from 'html-to-text';
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'
import Aos from 'aos'
import "aos/dist/aos.css"
import { Row, Col } from 'antd';

function PostItem({post}) {
    return (
        <>
        <Col data-aos="zoom-out-right" xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 18}} lx={{span: 18}}>
        <div className="w-full lg:w-2/3">
            <a className="block rounded w-full lg:flex mb-10" href="./blog-single-1.html">
                <div className="h-48 lg:w-48 flex-none bg-cover text-center overflow-hidden opacity-75" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80")'}} title="deit is very important">
                </div>
                <div className="bg-white rounded px-4 flex flex-col justify-between leading-normal pb-3">
                <div>
                    <div className="mt-3 md:mt-0 text-gray-700 font-bold text-2xl mb-2">
                    Aliquam venenatis nisl id purus rhoncus, in efficitur sem hendrerit.
                    </div>
                    <p className="text-gray-700 text-base">
                    Duis euismod est quis lacus elementum, eu laoreet dolor consectetur. 
                    Pellentesque sed neque vel tellus lacinia elementum. Proin consequat ullamcorper eleifend.
                    </p>
                </div>
                <div className="flex mt-3">
                    <img src="https://randomuser.me/api/portraits/men/86.jpg" className="h-10 w-10 rounded-full mr-2 object-cover" />
                    <div>
                    <p className="font-semibold text-gray-700 text-sm capitalize"> eduard franz </p>
                    <p className="text-gray-600 text-xs"> 14 Aug </p>
                    </div>
                </div>
                </div>
            </a>
        </div>

        </Col>

        <Col data-aos="zoom-out-left" xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}}>

        </Col>
        </>
    );
}

export default PostItem;