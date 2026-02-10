import axios from "axios";
import APP_ROUTES from "@/constants/app.routes";
import axiosInstance from "@/config/axios.config";

export const uploadImage = async ({ file, onProgress }) => {
  const formData = new FormData();
  formData.append('profile-picture', file);

  return await axiosInstance.post('/uploads/profile', formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleated = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total);

      onProgress(percentCompleated);
    }
  });
} 
