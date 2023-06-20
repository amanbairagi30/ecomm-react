// Those page which only logged in user can access
import React, { useEffect } from 'react'
import { GetCurrentUser } from '../apicalls/users';
import { Avatar, Badge, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../redux/loadersSlice';
import { SetUser } from '../redux/usersSlice';
import Notifications from './Notifications';
import { GetAllNotifications, ReadAllNotifications } from '../apicalls/notifications';

const ProtectedPage = ({ children }) => {

    // const [user, setUser] = React.useState(null);
    const [notifications = [], setNotifications] = React.useState([])
    const [showNotifications, setShowNotifications] = React.useState(false)
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateToken = async () => {

        try {
            dispatch(SetLoader(true));
            const response = await GetCurrentUser();
            dispatch(SetLoader(false));

            if (response.success) {
                dispatch(SetUser(response.data))
            }
            else {
                navigate("/login")
                message.error(response.message)
            }

        } catch (error) {
            dispatch(SetLoader(false));
            navigate("/login")
            message.error(error.message);
        }
    }

    const getnotifications = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetAllNotifications();
            dispatch(SetLoader(false));

            if (response.success) {
                setNotifications(response.data);
            }
            else {
                throw new Error(response.message);
            }


        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }

    const readNotifications = async () => {
        try {

            const response = await ReadAllNotifications();
            if (response.success) {
                getnotifications();
            }
            else {
                throw new Error(response.message);
            }


        } catch (error) {
            message.error(error.message);
        }

    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            validateToken();
            // setTimeout(() => {
            //     window.location.reload();
            // }, 1000);
            getnotifications();

            // navigate(0)
            // window.location.reload()
            // window.location.reload(false)
        } else {
            message.error("Please Login to Continue");
            navigate("/login")
        }

    }, [])
    return (

        user && (
            <div>

                {/* header */}
                <div className='flex justify-between items-center bg-primary p-5'>
                    <h1 className='text-white cursor-pointer' onClick={() => { navigate("/") }}>Ecomm</h1>
                    <div className='bg-white rounded-md py-2 px-5 flex items-center gap-8'>
                        <div className='flex items-center gap-2'>
                            <img className='w-8' src={user.profilePic} alt="" />
                            <span className='underline cursor-pointer' onClick={() => {
                                if (user.role === "user") {
                                    navigate("/profile");
                                }
                                else {
                                    navigate("/admin");
                                }
                            }}>{user?.name}</span>

                            <Badge count={notifications?.filter((notification) => !notification.read).length}
                                onClick={() => {
                                    readNotifications();
                                    setShowNotifications(true)
                                }}
                            >
                                <Avatar className='bg-primary cursor-pointer' shape="circle" size="large" icon={<i class="ri-notification-4-line"></i>} />
                            </Badge>
                        </div>
                        <i className="text-md ri-logout-box-r-line cursor-pointer"
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/login");
                            }}
                        ></i>
                    </div>
                </div>
                <div className="p-5">{children}</div>

                {
                    <Notifications
                        notifications={notifications}
                        reloadNotifications={getnotifications}
                        showNotifications={showNotifications}
                        setShowNotifications={setShowNotifications}
                    />
                }

            </div>
        )
        // <div>
        //     {user && (
        //         <div className='p-5'>
        //             {user.name}
        //             {children}
        //         </div>
        //     )}
        // </div>
    )
}

export default ProtectedPage


