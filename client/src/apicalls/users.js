import {axiosInstance} from "./axiosInstance";

// register user
export const RegisterUser = async(payload)=>{
    try {
        const response = await axiosInstance.post("/api/users/register",payload);
        return response.data;
    } catch (error) {
        return error.message 
    }
}

// login user
export const LoginUser = async(payload)=>{
    try {
        const response =  await axiosInstance.post("/api/users/login" , payload);
        return response.data;
    } catch (error) {
        return error.message 
    }
}


// get current user
export const GetCurrentUser = async()=>{
    try {
        const response =  await axiosInstance.post("/api/users/get-current-user");
        return response.data;
    } catch (error) {
        return error.message 
    }
}

// get all users at admin

export const GetAllUsers = async() =>{
    try {
        const response = await axiosInstance.get("/api/users/get-all-users");
        return response.data;

    } catch (error) {
        return error.message;
    }
}

// update user status admin
export const UpdateUserStatus = async(id,status) =>{
    try {
        const response = await axiosInstance.put(`/api/users/update-user-status/${id}` , {status});
        return response.data;

    } catch (error) {
        return error.message;
    }
}