import axios from "axios";
const REACT_APP_CLOUDINARY_UPLOAD_PRESET = "qos4khbd";
const REACT_APP_CLOUDINARY_CLOUD_NAME = "dbtam9pnc";
const REACT_APP_API_KEY_CLOUDINARY = "885239162821427";
const getImageUpload = async (file) => {
  if (!file) {
    return null;
  }
  const url = `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", REACT_APP_CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        upload_preset: REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        api_key: REACT_APP_API_KEY_CLOUDINARY,
      },
    });
    return response.data.url;
  } catch (error) {
    return null;
  }
};
export default getImageUpload;