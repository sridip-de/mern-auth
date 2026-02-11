import { useRef, useState } from "react";
import { useFetchUser } from "../hooks/useUser";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../services/mediaService";
import { queryClient } from "@/config/query.config";

import { FaCamera } from 'react-icons/fa';
import { toast } from "react-toastify";

const ProfilePicture = ({ user }) => {

  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const mutation = useMutation({
    mutationFn: (file) => uploadImage({ file, onProgress: setProgress }),
    onSuccess: (res) => {
      const picture = res.data?.data;
      queryClient.setQueryData(['user'], (old) => ({
        ...old,
        picture
      }));
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message)
    }
  })

  const handleImageClick = () => {
    fileInputRef.current?.click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onUpload(file);
  }

  const onUpload = (file) => {
    mutation.mutate(file);
  }

  return (
    <div
      onClick={handleImageClick}
      className="image-container group relative cursor-pointer mb-3 sm:mb-4" >

      {console.log(mutation.isError)}

      <img
        src={
          user?.data?.data?.picture?.url
          || 'https://ui-avatars.com/api/?name=Developer&background=cccccc'
        }
        className="rounded-full mb-3 sm:mb-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 "
        alt="Profile"
      />
      <div className="
        absolute inset-0
        bg-black/60
        rounded-full
        flex flex-col items-center justify-center
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200">
        <FaCamera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <p className="sm:text-xs">{mutation.isPending ? `Uploading... ${progress}` : ''}</p>

    </div>
  )
}

export default ProfilePicture
