import {axiosInstance} from "./axiosInstance";

// add a new product

export const AddProduct = async(payload) =>{
    try {
        const response = await axiosInstance.post("/api/products/add-product" , payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

// Get products
export const GetProducts = async() =>{
    try {
        const response = await axiosInstance.post("/api/products/get-products");
        return response.data;
    } catch (error) {
        return error.message;
    }
}
