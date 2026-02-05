import axios from "axios";
import APP_ROUTES from "@/constants/app.routes";

export const uploadImage = async ({ file, onProgress }) => {
  const formData = new FormData();
  formData.append('file', file);

  return await axios.post('https://api.escuelajs.co/api/v1/files/upload', formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleated = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total);

      onProgress(percentCompleated);
    }
  });
} 
