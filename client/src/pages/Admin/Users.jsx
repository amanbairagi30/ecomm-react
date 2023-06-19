import { Button, Table, message } from 'antd'
import React, { useEffect } from 'react'
// import ProductsForms from './ProductsForms';
import moment from "moment"
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';
import { GetProducts, UpdateProductStatus } from '../../apicalls/products';
import { GetAllUsers, UpdateUserStatus } from '../../apicalls/users';
// import { DeleteProduct, GetProducts, UpdateProductStatus } from '../../../apicalls/products';


const Users = () => {
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [users, setUsers] = React.useState([]);
    const [showProductForm, setShowProductForm] = React.useState(false);
    // const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const OnStatusUpdate = async (id ,status) => {
        try {
            dispatch(SetLoader(true));
            const response = await UpdateUserStatus(id,status);
            dispatch(SetLoader(false));
            
            if(response.success){
                message.success(response.message);
                getData();
            }
            else{
                throw new Error(response.message);
            }
            
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message)
        }
    }

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetAllUsers(null);
            dispatch(SetLoader(false));
            if (response.success) {
                setUsers(response.data);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    // const deleteProduct = async (id) => {
    //     try {
    //         dispatch(SetLoader(true));
    //         const response = await DeleteProduct(id);
    //         dispatch(SetLoader(false));
    //         if (response.success) {
    //             message.success(response.message);
    //             getData();
    //         } else {
    //             message.error(response.message)
    //         }
    //     } catch (error) {
    //         dispatch(SetLoader(false));
    //         message.error(error.message);
    //     }
    // }

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            render : (text,record)=>{
                switch (record.role) {
                    case "admin":
                        return <div className='text-white text-center rounded-sm  bg-purple-600'>{record.role.toUpperCase()}</div>
                        break;
                
                    default:
                        return <div className='text-center'>{record.role.toUpperCase()}</div>
                        break;
                }
            }
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            dataIndex: "createdAt",
            render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
        },

        {
            title: "Status",
            dataIndex: "status",
            render : (text,record)=>{
                switch (record.status) {
                    case "active":
                        return <div className='text-white text-center rounded-sm  bg-green-500'>{record.status.toUpperCase()}</div>
                        break;
                
                    case "blocked":
                        return <div className='text-white text-center rounded-sm  bg-red-500'>{record.status.toUpperCase()}</div>
                        break;
                
                    default:
                        break;
                }
                
            }
        },
      
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                const { status, _id } = record;
                return (
                    <div className='flex gap-3'>
                        {status === "active" && <span className='underline cursor-pointer'
                            onClick={() => OnStatusUpdate(_id, "blocked")}
                        >Block</span>}


                        {status === "blocked" && <span className='underline cursor-pointer'
                            onClick={() => OnStatusUpdate(_id, "active")}
                        >Unblock</span>}


                        

                    </div>
                )
            }
        }
    ];

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            

            <Table columns={columns} dataSource={users} />

        </div>
    )
}

export default Users;
