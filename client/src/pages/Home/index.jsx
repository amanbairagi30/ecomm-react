import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../../redux/loadersSlice'
import { GetProducts } from '../../apicalls/products'
import { message } from 'antd';
import Divider from "../../components/Divider"
import { useNavigate } from 'react-router-dom';
import "./home.css"
import Filters from './Filters';

const Home = () => {
  const [showFilters, setShowFilters] = React.useState(false);
  const [products, setProducts] = React.useState([])
  const [filters, setFilters] = React.useState({
    status: "approved",
    category : [],
    age : [],
  })
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));

      if (response.success) {
        setProducts(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  }




  useEffect(()=>{
    getData();
  } ,[filters]);

  return (
    <div className='flex gap-2'>
      {showFilters && <Filters
        setShowFilters={setShowFilters}
        showFilters={showFilters}
        filters={filters}
        setFilters={setFilters}
      />}
      <div className='flex w-full flex-col gap-5'>

        <div className="flex items-center gap-5">
          {!showFilters && <i className="cursor-pointer text-2xl ri-equalizer-line"
            onClick={() => setShowFilters(!showFilters)}></i> }

          <input type="text"
            placeholder='Search Products'
            className='border border-gray-300 border-solid rounded-md w-full p-2 h-15 '
          />
        </div>
        <div className={`grid ${showFilters ? "md:grid-cols-3" : "md:grid-cols-4"}  grid-cols-1  gap-5`}>
          {products.map((product) => {
            return <div className='border border-gray-400  p-4 rounded border-solid cursor-pointer'
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img src={product.images[0]} className='w-full h-64 object-cover border border-black' alt="No image" />
              <Divider />

              {/* product details */}

              <div className="py-5 flex flex-col gap-2">
                <h1 className='text-lg font-semibold'>{product.name}</h1>
                <div className='flex items-center justify-between'>
                  <p className='text text-sm text-gray-600'>{product.description}</p>
                  <span>&#8377; {product.price}</span>
                </div>

                <div className='relative -bottom-2 flex border border-black items-center justify-center gap-2'>
                  <span className='border border-solid border-1 text-center border-primary px-4 py-2 rounded-md '>
                    <i className="ri-heart-line font-semibold text-lg text-primary"></i>

                  </span>
                  <span className='bg-primary text-white text-center px-4 py-3 rounded-md w-[95%]'>Add to Bag</span>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
