export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "pelotaris");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dm4srmzi2/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Error al subir la imagen");
  }

  const data = await response.json();

  return data.secure_url;
};