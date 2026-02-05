import { uploadImage } from '@/features/user/services/mediaService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const UploadPage = () => {

  const queryClient = useQueryClient();
  const [progress, setProgress] = useState(0);
  const [media, setMedia] = useState(null);

  const mutation = useMutation({
    mutationFn: (file) => uploadImage({ file, onProgress: setProgress }),
    onSuccess: (res) => console.log(res),
    onError: (error) => console.log(error)
  })

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setMedia(file);
  };

  const onFileUpload = (e) => {
    e.preventDefault();
    console.log(media);
    if (media) mutation.mutate(media);

  }


  return (
    <div className="
  bg-zinc-800
  flex flex-col
  items-center
  justify-center
  h-[calc(100vh-60px)]
      text-zinc-200
">
      <h1>{media?.name}</h1>
      <p>{media?.type}</p>
      <form className="bg-zinc-900 p-8 rounded-lg border border-zinc-700">
        <input
          onChange={handleFileChange}
          type="file"
          className="
        file:mr-4 
        file:py-2 
        file:px-4
        file:rounded 
        file:border-0
        file:bg-zinc-700 
        file:text-zinc-100
        file:cursor-pointer
        hover:file:bg-zinc-600
        text-zinc-400
        cursor-pointer
      "
        />
        <button
          onClick={onFileUpload}
          type="submit"
          className="
    mt-4
    px-6
    py-2
    bg-zinc-700
    text-zinc-100
    rounded
    hover:bg-zinc-600
    transition-colors
  "
        >
          Upload
        </button>
      </form>
      <h2
        className='text-zinc-200 mt-6'
      >{mutation.isSuccess ? "Uploaded Successfully" : !media ? 'Choose a file' : ('Uploaded: ' + progress + '%')}</h2>
    </div>
  )
}

export default UploadPage
