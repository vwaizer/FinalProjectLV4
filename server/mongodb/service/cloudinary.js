import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: 'dbupj4dev',
  api_key: '477211245261498',
  api_secret: 'RwWhTDOdPH96F9ubKQOxqGWuGAI',
  secure: true,
});
 export const uploadImage = async (imagePath) => {

  // Use the uploaded file's name as the asset's public ID and 
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.secure_url;
  } catch (error) {
    console.error(error);
  }
};
export const deleteIMG= async(req,res)=>{
  const {imgID}=req.body;
  const result=await cloudinary.v2.api.delete_resources([imgID],{type:"upload",resource_type:"image"});
  const message=result.deleted;
  console.log(message.imgID);
  
 
  return res.json({message})
}