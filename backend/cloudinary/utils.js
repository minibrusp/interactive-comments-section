const cloudinary = require('../cloudinary/cloudinary')

const uploadImageCloudinary = async (imagePath) => {

  const options = {
    unique_filename: false,
    overwrite: true,
    folder: "interactive-comments/avatars",
    resource_type: "auto",
  }

  try {
    
    const result = await cloudinary.uploader.upload(imagePath, options)
    // console.log(result)
    return result
  } catch (error) {
    console.error(error)
    return error
  }
}


module.exports = { uploadImageCloudinary }