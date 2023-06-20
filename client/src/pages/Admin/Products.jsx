import { Button, Table, message } from 'antd'
import React, { useEffect } from 'react'
import ProductsForms from '../profile/products/ProductsForms';
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../redux/loadersSlice';
import { DeleteProduct, GetProductByID, GetProducts, UpdateProductStatus } from '../../apicalls/products';
import { AddNotifications } from '../../apicalls/notifications';


const Products = () => {
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    // const {user} = useSelector((state)=>state.users);
    const [products, setProducts] = React.useState([]);

    // below usestate is for single product
    // const [product, setProduct] = React.useState(null);
    const [showProductForm, setShowProductForm] = React.useState(false);
    // const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const OnStatusUpdate = async (id ,status) => {
        try {
            dispatch(SetLoader(true));
            const response = await UpdateProductStatus(id,status);
            // const response2 = await GetProductByID(id);
            const product = products.find((p) => p._id === id);


            dispatch(SetLoader(false));
            
            if(response.success){
                // adding notifications
                message.info("Before addnotifications ")
                await AddNotifications({
                    title : "Uploaded Product Status ", 
                    message : (status === "approved" ? "Congratulations " : "Unfortunately ") + "Your product has been " + status + (status === "approved" ? " , You can check your products live on website " : ", Please contact Admin ") , 
                    onClick : "/profile",
                    user : product.seller._id,
                    read : false,
                })
                message.info("After addnotifications ")
                getData();
                message.success(response.message);
                // setProduct(response2.data);
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
            title: "Image",
            dataIndex: "image",
            render : (text,record)=>{
                return (
                    <img loading='lazy' src={record?.images?.length > 0 ? record.images[0] : ""} 
                    alt=""
                    className='w-20 h-20 object-cover rounded-md'
                    />
                )
            }
        },
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
            <div className="flex justify-end gap-4 mb-4">
            <div className='flex p-2  border border-solid items-center justify-center cursor-pointer'
                    onClick={()=>{window.location.reload();}}
                >
                    Reload
                </div>
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
