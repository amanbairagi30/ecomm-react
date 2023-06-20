import { Button, Table, message } from 'antd'
import React, { useEffect } from 'react'
import ProductsForms from './ProductsForms';
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../../../redux/loadersSlice';
import { DeleteProduct, GetProducts } from '../../../apicalls/products';

const Products = () => {
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [products, setProducts] = React.useState([]);
    const [showProductForm, setShowProductForm] = React.useState(false);
    const { user } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetProducts({
                seller: user._id
            });
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
                    <img src={record?.images?.length > 0 ? record.images[0] : ""} 
                    alt=""
                    className='w-20 h-20 object-cover rounded-md'
                    />
                )
            }
        },
        {
            title: "Name",
            dataIndex: "name",
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
    ];

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <div className="flex gap-4 justify-end mb-4">

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
