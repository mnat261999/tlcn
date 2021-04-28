import React from 'react'
import { Button, notification, Divider, Space } from 'antd';

export const showErrMsg = (type,msg) => {
    return notification[type]({
        message: 'Error',
        description:`${msg}`
      });
}

export const showSuccessMsg = (type,msg) => {
    return notification[type]({
        message: 'Success',
        description:`${msg}`
      });
}