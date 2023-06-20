import {axiosInstance} from "./axiosInstance";

// add notifications

export const AddNotifications = async(payload)=>{
    try {
        const response = await axiosInstance.post("/api/notifications/notify" , payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// get all  notifications

export const GetAllNotifications = async()=>{
    try {
        const response = await axiosInstance.get("/api/notifications/get-all-notification");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// Delete notifications

export const DeleteNotifications = async(id)=>{
    try {
        const response = await axiosInstance.delete(`/api/notifications/delete-notification/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// read all  notifications

export const ReadAllNotifications = async()=>{
    try {
        const response = await axiosInstance.put("/api/notifications/read-all-notifications");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}