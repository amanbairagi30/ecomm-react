import { Button, Form, Input, message } from 'antd'
import { Link } from 'react-router-dom'
import React from 'react'
import { RegisterUser } from '../../apicalls/users'

const Register = () => {
  
  const onFinish = async(values) => {
    try {
      const response = await RegisterUser(values);
      if(response.success){
        message.success(response.message)
      }else{
        throw new Error(response.message);
      }

    } catch (error) {
        message.error(error.message);
    }
  }
  return (
    <div className='h-screen bg-primary flex justify-center items-center'>
      <div className="bg-white p-5 w-[500px]">
        <h1 className="text-primary text-center my-4">
          Ecomm <span className='text-gray-500'>Register</span>
        </h1>
        <Form
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item label="Name : " name={"name"}>
            <Input placeholder='Name?' />
          </Form.Item>
          <Form.Item label="Email : " name={"email"}>
            <Input placeholder='Email?' />
          </Form.Item>
          <Form.Item label="Password : " name={"password"}>
            <Input type='password' placeholder='Password?' />
          </Form.Item>

          <Button type='primary' block htmlType='submit'>Register</Button>


          <div className="mt-5 text-center">
            <span className='text-gray-500'>
              Already have an account ? <Link to="/login" className='text-primary'>Login</Link>
            </span>
          </div>
        </Form>
      </div>

    </div>
  )
}

export default Register
