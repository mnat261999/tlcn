import {useState,useContext} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../../GlobalState'
import { Row, Col } from 'antd';

function SearchProducts() {
    const state = useContext(GlobalState)
    const [category, setCategory] = useState('')
    return (
        <div>
            
        </div>
    );
}

export default SearchProducts;