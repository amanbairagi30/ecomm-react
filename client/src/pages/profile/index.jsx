import React from 'react'
import { Divider, Tabs } from "antd"
import Products from './products'
import { useSelector } from 'react-redux'
import moment from 'moment'

const Profile = () => {

  const { user } = useSelector((state) => state.users);
  return (
    <div>
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bids" key="3">
          <h1>Bids</h1>
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="2">
          <div className='w-full h-[70vh] flex border border-dashed border-gray-300 '>
            <div className='flex text-base items-center flex-col w-[30%] p-4 rounded-md m-auto border border-solid border-primary'>

              <div className='w-fit h-fit text-center rounded-full border border-dashed object-cover '>
                <img className='h-24 w-fit object-cover p-1' loading='lazy' src={user.profilePic} alt="" />
              </div>

              <Divider/>

              <div className='w-full mt-6'>

                <div className='flex justify-between'>
                  <span>Name : </span>
                  <span className='text2xl'>{user.name}</span>
                </div>

                <div className='flex justify-between'>
                  <span>Email : </span>
                  <span className='text2xl'>{user.email}</span>
                </div>

                <div className='flex justify-between'>
                  <span>Created At : </span>
                  <span className='text2xl'>{moment(user.createdAt).format("MMM D , YYYY hh:mm A")}</span>
                </div>

                <div className='flex justify-between'>
                  <span>My Role : </span>
                  <span className='text2xl'>{user.role.toUpperCase()}</span>
                </div>
              </div>

            </div>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default Profile
