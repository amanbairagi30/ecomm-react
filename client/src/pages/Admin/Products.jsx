import { Button, Table, message } from 'antd'
import React, { useEffect } from 'react'
import ProductsForms from '../profile/products/ProductsForms';
import moment from "moment"
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';
import { DeleteProduct, GetProducts, UpdateProductStatus } from '../../apicalls/products';


const Products = () => {
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [products, setProducts] = React.useState([]);
    const [showProductForm, setShowProductForm] = React.useState(false);
    // const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const OnStatusUpdate = async (id ,status) => {
        try {
            dispatch(SetLoader(true));
            const response = await UpdateProductStatus(id,status);
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
            const response = await GetProducts(null);
            dispatch(SetLoader(false));
            if (response.success) {
                setProducts(response.data);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const deleteProduct = async (id) => {
        try {
            dispatch(SetLoader(true));
            const response = await DeleteProduct(id);
            dispatch(SetLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message)
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }

    const columns = [
        {
            title: "Products",
            dataIndex: "name",
        },
        {
            title: "Seller",
            dataIndex: "name",
            render: (text, record) => {
                return record.seller.name
            },
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Category",
            dataIndex: "category",
        },
        {
            title: "Age",
            dataIndex: "age",
        },
        {
            title: "Status",
            dataIndex: "status",
            render : (text,record)=>{
                // return record.status.toUpperCase();
                switch (record.status) {
                    case "approved":
                        return <div className='bg-green-500 text-center text-white px-1 rounded-sm'>{record.status.toUpperCase()}</div>
                        break;
                    case "pending":
                        return <div className='bg-yellow-500 text-center text-white px-1 rounded-sm'>{record.status.toUpperCase()}</div>
                        break;
                    case "blocked":
                        return <div className='bg-red-500 text-center text-white px-1 rounded-sm'>{record.status.toUpperCase()}</div>
                        break;
                    case "rejected":
                        return <div className='bg-orange-500 text-center text-white px-1 rounded-sm'>{record.status.toUpperCase()}</div>
                        break;
                
                    default:
                        break;
                }
            }
        },
        {
            title: "Added On",
            dataIndex: "createdAt",
            render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return (
                    <div className='flex gap-5 text-lg'>
                        <i className='ri-pencil-line cursor-pointer'
                            onClick={() => {
                                setSelectedProduct(record);
                                setShowProductForm(true)
                            }}
                        ></i>
                        <i className='ri-delete-bin-line cursor-pointer hover:text-red-500'
                            onClick={() => {
                                deleteProduct(record._id);
                            }}
                        ></i>
                    </div>
                )
            }
        },

        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                const { status, _id } = record;
                return (
                    <div className='flex gap-3'>
                        {status === "pending" && <span className='underline cursor-pointer'
                            onClick={() => OnStatusUpdate(_id, "approved")}
                        >Approve</span>}


                        {status === "pending" && <span className='underline cursor-pointer'
                            onClick={() => OnStatusUpdate(_id, "rejected")}
                        >Reject</span>}


                        {status === "approved" && <span className='underline cursor-pointer'
                            onClick={() => OnStatusUpdate(_id, "blocked")}
                        >Block</span>}


                        {status === "blocked" && <span className='underline cursor-pointer'
                            onClick={() => OnStatusUpdate(_id, "approved")}
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
            <div className="flex justify-end mb-4">
                <Button
                    type='default'
                    onClick={() => {
                        setSelectedProduct(null);
                        setShowProductForm(true)
                    }}
                >Add Product</Button>
            </div>

            <Table columns={columns} dataSource={products} />

            {showProductForm && <ProductsForms getData={getData} showProductForm={showProductForm} selectedProduct={selectedProduct} setShowProductForm={setShowProductForm} />}
        </div>
    )
}

export default Products
