import {useState, useEffect} from 'react'
import axios from 'axios'
import {notification} from 'antd';


function UserAPI(token) {
    
    const [isLoggin, setIsLoggin] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const [historyFalse, setHistoryFalse] = useState([])
    const [historyTrue, setHistoryTrue] = useState([])

    const [location, setLocation] = useState('')

    const [cities, setCities] = useState([])

    const [callbackPayment, setCallbackPayment] = useState(false)

/*     const [idCity, setIdCity] = useState('')

    const [districts, setDistricts] = useState([]) */
    //const [callback, setCallback] = useState(false)

    const showErrMsg = (type,msg) => {
        return notification[type]({
            message: 'Error',
            description:`${msg}`
          });
    }

    const showSuccessMsg = (type,msg) => {
        return notification[type]({
            message: 'Success',
            description:`${msg}`
          });
    }
    

    console.log("test:")
    console.log(token)
    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })
                    console.log("test123")
                    console.log(token)

                    localStorage.setItem('token', token)
 
                    setIsLoggin(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false) 

                    setCart(res.data.cart)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()

            const getHistory = async () =>{
                if(isAdmin)
                {
                    const res = await axios.get('/api/payment', {
                        headers: {Authorization: token}
                    })
                    console.log("test-history:"+ res)
 
                     setHistory(res.data)
                }
                else{
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })
                    console.log("test-history:"+ res)
 
                     setHistory(res.data.history)
                     setHistoryFalse(res.data.historyFalse)
                     setHistoryTrue(res.data.historyTrue)
                    //res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false) 

                    //setCart(res.data.cart) 
                }
            }

            getHistory()
            
        }
        else{
            const getCities = async () =>{
                console.log('city')
                const res = await axios.get('/user/city')
                console.log(res)
                setCities(res.data.LtsItem)
            }
    
            getCities()

        }

    },[token, isAdmin, setHistory,callbackPayment])



    const addCart = async (product) => {
        if(!isLoggin) return showErrMsg('error',"Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng")

        const check = cart.every(item =>{
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}])

            const res= await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            }) 
            console.log("cart", res)
            showSuccessMsg('success',"Thêm thành công")

        }else{
            console.log("test-addcart")
            showErrMsg('error',"Sản phẩm đã được thêm vào giỏ hàng")
        }
    }

    return {
        isLoggin: [isLoggin, setIsLoggin],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        location:[location, setLocation],
        cities:[cities,setCities],
        historyFalse:[historyFalse, setHistoryFalse],
        historyTrue:[historyTrue, setHistoryTrue],
        callbackPayment:[callbackPayment, setCallbackPayment]
/*         idCity:[idCity, setIdCity],
        districts:[districts,setDistricts] */
        //callback:[callback, setCallback]
    }
}

export default UserAPI
 