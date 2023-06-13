// Those page which only logged in user can access
import React, { useEffect } from 'react'
import { GetCurrentUser } from '../apicalls/users';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../redux/loadersSlice';
import { SetUser } from '../redux/usersSlice';

const ProtectedPage = ({ children }) => {
    
    // const [user, setUser] = React.useState(null);
    const {user} = useSelector((state) =>state.users);
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

    useEffect(() => {
        if (localStorage.getItem("token")) {
            validateToken();
            // navigate(0)
            // window.location.reload()
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
                    <h1 className='text-white'>Ecomm</h1>
                    <div className='bg-white rounded-md py-2 px-5 flex items-center gap-8'>
                        <div className='flex items-center'>
                            <img className='w-8' src={user.profilePic} alt="" />
                            <span className='underline cursor-pointer' onClick={()=>navigate("/profile")}>{user?.name}</span>
                        </div>
                        <i className="text-md ri-logout-box-r-line cursor-pointer"
                            onClick={()=>{
                                localStorage.removeItem("token");
                                navigate("/login");
                            }}
                        ></i>
                    </div>
                </div>
                <div className="p-5">{children}</div>
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


