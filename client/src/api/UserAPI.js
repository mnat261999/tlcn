import {useState, useEffect} from 'react'
import axios from 'axios'


function UserAPI(token) {
    
    const [isLoggin, setIsLoggin] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    //const [callback, setCallback] = useState(false)
    

    console.log("test:")
    console.log("test-token:"+token)
    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })
                    console.log("test123:"+ res)
 
                    setIsLoggin(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false) 

                    setCart(res.data.cart)
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
            
        }
    },[token])



    const addCart = async (product) => {
        if(!isLoggin) return alert("Please login to continue buying")

        const check = cart.every(item =>{
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}])

            await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })

        }else{
            console.log("test-addcart")
            alert("This product has been added to cart.")
        }
    }

    return {
        isLoggin: [isLoggin, setIsLoggin],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory]
        //callback:[callback, setCallback]
    }
}

export default UserAPI
 