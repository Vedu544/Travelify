import {v2 as cloudinary} from "cloudinary"
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
    api_key: process.env.CLOUDINARY_API_KEY,   
    api_secret: process.env.CLOUDINARY_API_SECRET, 
})


const uploadOnCloudinary = async(localfilePath)=>{
    try {
        if(!localfilePath)
            return null
        const res = await cloudinary.uploader.upload(localfilePath,{
            resource_type:"auto"
        })
        // console.log("file uploaded successfully")
        fs.unlinkSync(localfilePath)
        return res
        
}catch(err){
    fs.unlinkSync(localfilePath); // delete the local file if error occurs
        return null;
}
}
export {uploadOnCloudinary}
