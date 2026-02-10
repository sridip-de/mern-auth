import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  secure: true, // returns https only url 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'mern-auth' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // End the stream by passing the buffer;
    stream.end(buffer);
  })
}

export default uploadFromBuffer;

// **Note**
// Since the cloudinary upload_stream uses the old callback apprach and doesnot returns any Promise
// We need to wrap the while thing inside a Promise and resolve the reject inside the callback;
//
// 2. the upload_stream returns a 'Writeable Stream', it means cloudinary has opened a **digital tunnel** for you
//  you are holding the etrance to that tunnel, and anything you push into it will be sent direclty to the cludinary's server
//  - when you call the upload_stream, the connection to cloudinary stays open. so after send the buffer to it we also need to close that tunnel so we are calling the end();
//  - we could have write stream.write(buffer) and then stream.end(); manually
