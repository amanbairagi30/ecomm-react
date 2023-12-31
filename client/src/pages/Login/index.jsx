import React, { useEffect } from 'react'
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import {LoginUser} from "../../apicalls/users"
import { useDispatch } from 'react-redux'
import { SetLoader } from '../../redux/loadersSlice'

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await LoginUser(values);
      dispatch(SetLoader(false));
      
      if (response.success) {
        message.success(response.message)
        localStorage.setItem("token", response.data);
        navigate("/")
      } else {
        throw new Error(response.message);
      }

    } catch (error) {
      dispatch(SetLoader(false));
      console.log(error)
      message.error(error.message);
    }
  }

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/")
    }
  },[])

  return (
    <div>
      <div className='h-screen bg-primary flex justify-center items-center'>
        <div className="bg-white p-5 w-[500px]">
          <h1 className="text-primary text-center my-4">
            Ecomm <span className='text-gray-500'>Login</span>
          </h1>
          <Form
            layout="vertical"
            onFinish={onFinish}
          >

            <Form.Item label="Email : " name={"email"}>
              <Input placeholder='Email?' />
            </Form.Item>
            <Form.Item label="Password : " name={"password"}>
              <Input type='password' placeholder='Password?' />
            </Form.Item>

            <Button type='primary' block htmlType='submit'>Login</Button>


            <div className="mt-5 text-center">
              <span className='text-gray-500'>
                Donot have an account ? <Link to="/register" className='text-primary'>Register</Link>
              </span>
            </div>
          </Form>
        </div>

      </div>
    </div>
  )
}

export default Login
