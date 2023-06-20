import React from 'react'
import { Divider, Modal, message } from "antd"
import { DeleteNotifications } from '../apicalls/notifications';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../redux/loadersSlice';

const Notifications = ({
    notifications = [],
    reloadNotifications,
    showNotifications,
    setShowNotifications,
}) => {
    const dispatch = useDispatch();

    const deleteNotification = async (id) => {
        try {
            dispatch(SetLoader(true));
            const response = await DeleteNotifications(id);
            dispatch(SetLoader(false));
            if (response.success) {
                reloadNotifications();
            }
            else {
                throw new Error(response.message);
            }

        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }

    }

    return (
        <Modal
            title="Notifications"
            open={showNotifications}
            onCancel={() => { setShowNotifications(false) }}
            footer={null}
            centered
            width={1000}
        >


            {notifications ? (


                <div className="flex flex-col">
                    {notifications.map((notification) => (
                        <div className='flex items-center cursor-pointer justify-between border border-solid mt-2 border-primary'
                            onClick={()=>notification.onClick}
                        >

                            <div className="flex flex-col gap-2 p-2 ">
                                <span className='text-primary text-base font-semibold'>{notification.title}</span>
                                {/* <Divider />  */}
                                <p>{notification.message}</p>
                            </div>

                            <div className='hover:bg-red-500 hover:text-white  px-2 py-1 rounded-[0.35rem] m-2'
                                onClick={() => deleteNotification(notification._id)}
                            ><i className='text-2xl  ri-delete-bin-line cursor-pointer'></i></div>
                        </div>
                    ))}
                </div>

            ) :
                <div className="flex text-center justify-center border-1 mt-2 border-dashed h-20 items-center text-2xl text-gray-300 font-semibold">
                    No Notifications
                </div>
            }

        </Modal>
    )
}

export default Notifications
