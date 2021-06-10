const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')


const paymentCtrl = {
    getPayments: async(req, res) =>{
        try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPayment: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('name email')
            if(!user) return res.status(400).json({msg: "User does not exist."})

            const {cart, paymentID, address, status,type,phone,total} = req.body;

            const {_id, name, email} = user;

            let statusName;

            if(status === 1)
            {
                console.log('pay')
                statusName = "Chưa thanh toán"
            }else if(status === 2)
            {
                statusName = "Đã thanh toán"
            }else if(status === 0)
            {
                statusName = "Đã hủy"
            }

            let typeName;

            if(type === 1)
            {
                typeName = "Thanh toán khi nhận hàng"
            }else if(status === 2)
            {
                typeName = "Thanh toán bằng paypal"
            }

            //console.log({statusName})
            //console.log({typeName})

            const newPayment = new Payments({
                user_id: _id, name, email, cart, paymentID, address,status,statusName,type,typeName,phone,total
            })

            if(status === 2){
                cart.filter(item => {
                    return soldandstock(item._id, item.quantity, item.sold, item.stock)
                })
    
            }
            await newPayment.save()
            
            
          res.json({msg: "Payment Succes!"}) 
            //res.json({newPayment})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updataCanclePayment: async(req, res) => {
        try {
            const {status} = req.body
            console.log({status})
            console.log(req.params.id)
            let statusName;
            if(status === 0)
            {
                statusName = "Đã hủy"
            }

            await Payments.findOneAndUpdate({_id: req.params.id},{
                status, statusName 
            })

            res.json({msg: "Hủy thành công!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const soldandstock = async (id, quantity, oldSold,stockold) => {
    await Products.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold,
        stock: stockold-(quantity + oldSold)
    })
}

/* const stock = async(id,stockold, sold) =>{
    await Products.findOneAndUpdate({_id: id}, {
        stock: stockold - sold
    })
} */

module.exports = paymentCtrl
