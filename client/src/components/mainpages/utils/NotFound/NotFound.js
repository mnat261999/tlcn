import React from 'react'
import { Result, Button } from 'antd';
import BreadCrumb from '../../BreadCumb'

function NotFound(){
    return (
    <>
    <BreadCrumb/>
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
    />
    </>
    )
}
export default NotFound