import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../../redux/loadersSlice'
import { GetProductByID, GetProducts } from '../../apicalls/products'
import { message } from 'antd';
import Divider from "../../components/Divider"
import { useNavigate, useParams } from 'react-router-dom';
import moment from "moment"

const ProductInfo = () => {
    const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

    // const [product, setProduct] = React.useState([]) --- this is not valid because when page reloads it value will become empty array and by using "null" , by using this  you can handle the case where the product data is still loading or not yet available. In this case, the component can render nothing or a loading spinner until the data is fetched and the state is updated with the actual product information.


    const [product, setProduct] = React.useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const getData = async () => {
        try {
            dispatch(SetLoader(true));
            const response = await GetProductByID(id);
            dispatch(SetLoader(false));

            if (response.success) {
                setProduct(response.data);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    }


    React.useEffect(() => {
        getData();
    }, [])

    return (
        product && (

            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* images */}
                    <div className='flex gap-5 justify-center '>
                        <div className='flex flex-col gap-2 h-[60vh] w-fit p-2  border-solid border-2 border-primary'>
                            <img className='h-full w-full object-cover' src={product.images[selectedImageIndex]} alt="" />

                        </div>

                        <div className='flex flex-col gap-5  '>
                            {product.images.map((image, index) => {
                                return (
                                    <img className={'w-20 h-20 object-cover rounded-sm cursor-pointer p-1 ' +
                                        (selectedImageIndex === index ? "border-dashed border-2 border-primary p-1" : "")
                                    }
                                        src={image}
                                        alt=""
                                        onClick={() => setSelectedImageIndex(index)}
                                    />
                                )
                            })}
                        </div>

                    </div>

                    {/* details */}
                    <div className="px-4 flex flex-col gap-5 ">
                        <div>
                            <h1 className='mb-1'>{product.name}</h1>
                            <span className='text-sm text-gray-500  '>Added on : {moment(product.createdAt).format("DD-MM-YYYY hh:mm A")}</span>
                        </div>

                        <Divider />

                        <div className='flex flex-col gap-4'>
                            <span className='text-2xl font-semibold'>Product Details</span>

                            <div className='flex items-center justify-between'>
                                <span className='text-3xl'>&#8377; {product.price}</span>
                                <span className='text-green-500 px-2 border-solid rounded-full border-[0.15rem] border-green-500'>Free Delivery
                                    <i className="text-green-500 ri-check-double-fill"></i>
                                </span>
                            </div>

                            <div className="flex justify-between mt-0">
                                <span>Category</span>
                                <span>{product.category.toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between mt-0">
                                <span>Bill Available</span>
                                <span>{product.billAvailable ? "Yes" : "No"}</span>
                            </div>
                            <div className="flex justify-between mt-0">
                                <span>Box Available</span>
                                <span>{product.boxAvailable ? "Yes" : "No"}</span>
                            </div>
                            <div className="flex justify-between mt-0">
                                <span>Warranty Available</span>
                                <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
                            </div>
                            <div className="flex justify-between mt-0">
                                <span>Accessories Available</span>
                                <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
                            </div>
                            <div className="flex justify-between mt-0 ">
                                <span>Purchased Year</span>
                                <span>{moment().subtract(product.age , 'years').format("YYYY")}</span>
                            </div>

                        </div>

                        <Divider />

                        <div className="flex sticky flex-col md:flex-row gap-4 h-fit justify-center items-center">
                            <div className="flex items-center cursor-pointer hover:bg-green-900  justify-center buy text-center h-[3.5rem] bg-primary text-white w-full">
                                Buy Now
                            </div>
                            <div className="flex text-center  cursor-pointer  items-center justify-center h-[3.5rem] w-full border border-solid border-primary">
                                Add to Cart
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col mt-4 border border-solid  p-4">
                        <span className='text-3xl font-semibold'>About this</span>
                        <p>{product.description}</p>
                    </div>
                    <div className="flex flex-col mt-4 border border-solid  p-4">
                        <span className='text-3xl font-semibold'>Seller Details</span>
                        

                        <div className="flex justify-between mt-0">
                            <span>Name</span>
                            <span>{product.seller.name}</span>
                        </div>

                        <div className="flex justify-between mt-0">
                            <span>Email</span>
                            <span>{product.seller.email}</span>
                        </div>
                    </div>
                </div>

            </div>
        )
    )
}

export default ProductInfo
