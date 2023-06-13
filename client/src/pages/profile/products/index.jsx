import { Button, Table, message } from 'antd'
import React, { useEffect } from 'react'
import ProductsForms from './ProductsForms';
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../../redux/loadersSlice';
import { GetProducts } from '../../../apicalls/products';

const Products = () => {
    const[products,setProducts] = React.useState([]);
    const [showProductForm, setShowProductForm] = React.useState(false);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetProducts();
            dispatch(SetLoader(false));
            if(response.success){
                setProducts(response.products);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
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
        },
        {
            title: "Action",
            dataIndex: "action",
            render : (text , record)=>{
                return (
                    <div className='flex gap-5 text-lg'>
                        <i className='ri-pencil-line cursor-pointer'></i>
                        <i className='ri-delete-bin-line cursor-pointer'></i>
                    </div>
                )
            }
        },
    ];

    useEffect(()=>{
        getData();
    },[])

    return (
        <div>
            <div className="flex justify-end mb-4">
                <Button
                    type='default'
                    onClick={() => setShowProductForm(true)}
                >Add Product</Button>
            </div>

            <Table columns={columns} dataSource={products}/>

            {showProductForm && <ProductsForms showProductForm={showProductForm} setShowProductForm={setShowProductForm} />}
        </div>
    )
}

export default Products
