import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'


function ActivationEmail() {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/user/activation', {activation_token})
                    showSuccessMsg('success',res.data.msg)
                } catch (err) {
                    err.response.data.msg && showErrMsg('error',err.response.data.msg)
                }
            }
            activationEmail()
        }
    },[activation_token])
     return (
        <>
{/*         <div>
            {err && showErrMsg('error',err)}
            {success && showSuccessMsg('success',success)}
        </div> */}
        </>
    );
}

export default ActivationEmail;