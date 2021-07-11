import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { Row, Col} from 'antd';
import { Avatar } from 'antd';
import {showSuccessMsg, showErrMsg} from '../utils/notification/Notification'
import PaypalButton from './PaypalButton'
import { Drawer} from 'antd';
import "aos/dist/aos.css"
import Aos from 'aos'
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [cities, setCities]= state.userAPI.cities
    const [city, setCity] = useState('')

    const [idCity, setIdCity]= useState('')
    const [districts,setDistricts] =  useState([])
    const [district,setDistrict] =  useState('')

    const [idDistrict, setIdDistrict]= useState('')
    const [wards,setWards] =  useState([])
    const [idWard, setIdWard]= useState('')
    const [ward,setWard] =  useState('')
    const [address,setAddres] =  useState('')
    const [phone, setPhone] =  useState('')

    const [total, setTotal] = useState(0)
    const token = useSelector(state => state.token)
    const [callback, setCallback] = state.productsAPI.callback
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

    

    const handleCity = async e => {
        console.log('e.target.value city')
        console.log(e)
        //setCity(e)
        setIdCity(e)
    }

    const handleDistrict = async e => {
        console.log('e.target.value district')
        console.log(e)
        setIdDistrict(e)
    }

    const handleWard = async e => {
        console.log('e.target.value Ward')
        console.log(e)
        setIdWard(e)
        
    }

    const handleAddress = async e => {
        console.log('Address', e.target.value+" "+ ward + " " + district + " " + city);
        setAddres(e.target.value+" "+ ward + " " + district + " " + city)
      };

      const handlePhone = e => {
        console.log('Phone', e.target.value);
        setPhone(e.target.value)
      };

      const tailLayout = {
        wrapperCol: {span: 24 },
      };

    const showDrawer = () => {
        setVisible(true);
      };
    
      const onClose = () => {
        setVisible(false);
      };


    useEffect(() =>{
        Aos.init({duration: 2000}); 
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                console.log("prev",prev)
                console.log("item.price",item.price)
                console.log("item.quantity",item.quantity)
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

        if(idCity)
        {
            const getDistricts = async () =>{
                const res = await axios.get(`/user/district/${idCity}`)
                console.log(res.data.district)
                setDistricts(res.data.district)
            }
            getDistricts()

            
            if(cities.find(_ =>_.ID === idCity))
            {
                const nameCity = cities.find(_ =>_.ID === idCity).Title
                console.log({nameCity})
                setCity(nameCity)
            }
            setIdCity('')
        }

        if(idDistrict)
        {
            const getWards = async () =>{
                const res = await axios.get(`/user/ward/${idDistrict}`)
                console.log(res.data.ward)
                setWards(res.data.ward)
            }
            getWards()

            if(districts.find(_ =>_.ID === idDistrict))
            {
                const nameDistrict = districts.find(_ =>_.ID === idDistrict).Title
                console.log({nameDistrict})
                setDistrict(nameDistrict)
            } 
            setIdDistrict('')
        }

        if(idWard)
        {
            if(wards.find(_ =>_.ID === idWard))
            {
                const nameWard = wards.find(_ =>_.ID === idWard).Title
                console.log({nameWard})
                setWard(nameWard)
            }
        }

    },[cart,setDistricts,idCity,setCity,cities,idDistrict,districts,idWard,wards])

    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }

    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        console.log({cart})
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        console.log({cart})
        addToCart(cart)
    }

    const removeProduct = (id) =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const tranSuccess = async(payment) => {
        console.log(payment)
        const {paymentID, address} = payment;
        console.log({cart})

        await axios.post('/api/payment', {cart, paymentID, address, status:2,type:2,total}, {
            headers: {Authorization: token}
        })

        setCart([])
        addToCart([])
/*         
        console.log("test alert transucess") */
        showSuccessMsg('success',"Bạn đã đặt hàng thành công") 

        setCallback(!callback)

    }

    const orderSuccess = async() => {
        console.log({cart})
        const form = new FormData();
        form.append('address', address)
        form.append('phone', phone)
        form.append('total', total)
        if(!city)
        {
            return showErrMsg('error',"Bạn chưa chọn thành phố")
        }else if(!district){
            return showErrMsg('error',"Bạn chưa chọn quận/huyện")
        }else if(!ward)
        {
            return showErrMsg('error',"Bạn chưa chọn phường/xã")
        }else if(!address)
        {
            return showErrMsg('error',"Bạn chưa nhập địa chỉ")
        }else if(!phone){
            return showErrMsg('error',"Bạn chưa nhập số điện thoại")
        }

        await axios.post('/api/payment', {cart, address,phone,total,status:1, type:1}, {
            headers: {Authorization: token}
        })
        
        setCart([])
        addToCart([])
/*         
        console.log("test alert transucess") */
        showSuccessMsg('success',"Bạn đã đặt hàng thành công. Hãy nghe điện thoại để xác nhận đơn hàng nhé!") 

        setCallback(!callback)

    }

    


 /*    if(cart.length === 0) return<>
 
        </> */

    return (
        <>
        {
            cart.length === 0 && <div className="bg-gray-100">
            <div className="container pt-40 pb-40 container-card">
                <div className="group-card">
                    <h2>Giỏ hàng <span>(0 sản phẩm)</span></h2>
                    <div className="no-data-cart">
                        <h3>Không có sản phẩm nào trong giỏ hàng của bạn</h3>
                        <Link className="transition duration-700 ease-in-out ... transform hover:scale-110 focus:outline-none" to="/product">Tiếp tục mua sắm</Link>
                    </div>
                </div>
            </div>
        </div>
        ||
        <div className="bg-gray-100">
        <div className="container pt-40 pb-40 container-card">
            <div className="group-card">
                <h2 className="text-4xl">Giỏ hàng <span>({cart.length}  sản phẩm)</span></h2>
                <div className="group-card-item">
                    <Row gutter={[16, 16]}>
                            
                                <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 16}} lx={{span: 16}}>
                                {
                                    cart.map(product =>(
                                    <div class="frames-card-item" key={product._id}>
                                        <button onClick={() => removeProduct(product._id)} className="delete-item">
                                            <i className="fas fa-trash-alt" title="Remove"></i>
                                        </button> 
                                        <div className="card-items">
                                            <Row gutter={[16, 16]} justify="space-around">
                                                <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                                                    <Avatar shape="square" size={120} src={product.images.url}/>
                                                </Col>
                                                <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                                                    <h3 className="text-3xl font-bold">Sản phẩm</h3>
                                                    <p>{product.content}</p>
                                                </Col>
                                                <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                                                    <h3 className="text-3xl font-bold">Gía</h3>
                                                    <p className="price text-4xl">{numberWithCommas(product.price)} <u>đ</u></p>
                                                </Col>
                                                <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}} lx={{span: 6}} className="text-center">
                                                    <h3 className="text-3xl font-bold">Số lượng</h3>
                                                    <div className="quantity-number">
                                                        <button onClick={() => decrement(product._id)} class="click-left">-</button>
                                                        <div>{product.quantity}</div>
                                                        <button onClick={() => increment(product._id)} class="click-right">+</button>
                                                    </div>
                                                </Col>
                                            </Row> 
                                            <div className="total-item">
                                                <p className="total-sum font-bold text-3xl">
                                                    Tổng cộng: {numberWithCommas(product.price*product.quantity)} <u>đ</u>
                                                </p>  
                                            </div>
                                        </div>                                            
                                    </div>))
                                }
                                </Col>
                        <Col data-aos="zoom-out-left"  xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 8}} lx={{span: 8}}>
                            <div className="card-total-money">
                                <div className="total-money">
                                    <h3>Thành tiền</h3>
                                    <div className=" mb-10 group-total-money">
                                        <p>{numberWithCommas(total)} <u>đ</u></p>
                                    </div>
                                    <PaypalButton
                                    total={total*4/100000}
                                    tranSuccess={tranSuccess}/>
                                    <button onClick={showDrawer} className="check-out transition duration-700 ease-in-out ... transform hover:scale-110 focus:outline-none">Thanh toán khi nhận hàng</button>
                                    <Drawer
                                        title="Thông tin nhận hàng"
                                        placement="right"
                                        closable={false}
                                        onClose={onClose}
                                        visible={visible}
                                        width={380}
                                    >
                                    <Form
                                        layout="vertical"
                                    >
                                        <Form.Item
                                        name="city"
                                        label="Tỉnh/ Thành phố"
                                        rules={[{ required: true, message: 'Vui lòng chọn tỉnh thành phố' }]}
                                        >
                                            <Select
                                                placeholder="Tỉnh/ Thành phố"
                                                onChange={handleCity}
                                                value={city}
                                                allowClear>
                                                {
                                                    cities.map(option =><Option key={option.ID} value={option.ID}>{option.Title}</Option>)
                                                }
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                        name="district"
                                        label="Quận/ Huyện"
                                        rules={[{ required: true, message: 'Vui lòng chọn quận huyện' }]}
                                        >
                                            <Select
                                                placeholder="Quận/ Huyện"
                                                onChange={handleDistrict}
                                                value={district}
                                                allowClear
                                            >
                                                {
                                                    districts.map(option =><Option key={option.ID} value={option.ID}>{option.Title}</Option>)
                                                }
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                        name="ward"
                                        label="Phường, xã & thị trấn"
                                        rules={[{ required: true, message: 'Vui lòng chọn phường xã' }]}
                                        
                                        >
                                            <Select
                                                placeholder="Phường, xã & thị trấn"
                                                onChange={handleWard}
                                                allowClear
                                                value={ward}
                                            >
                                                {
                                                    wards.map(option =><Option key={option.ID} value={option.ID}>{option.Title}</Option>)
                                                }
                                            </Select>
                                        </Form.Item>


                                        <Form.Item
                                        name="address"
                                        label="Địa chỉ(số nhà, tên đường)"
                                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                                        >
                                           <TextArea showCount maxLength={100} onChange={handleAddress} />
                                        </Form.Item>

                                        <Form.Item
                                        name="phone"
                                        label="Số điện thoại"
                                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                                        >
                                           <Input placeholder="Số điện thoại" value={phone}onChange={handlePhone}/>
                                        </Form.Item>

                                        <Form.Item {...tailLayout}>
                                            <Button onClick={orderSuccess} className="order" type="primary" htmlType="submit">Đặt hàng ngay</Button>
                                        </Form.Item>
                                    </Form>
                                    </Drawer>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    </div>
        }
        </>
    );
}

export default Cart;