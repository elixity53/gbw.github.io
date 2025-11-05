// Admin panel functionality for Gentle Bear Knifeworks

const CLOUDINARY_UPLOAD_PRESET = "unsigned";
const CLOUDINARY_CLOUD_NAME = "dcn6qvnhq";

async function uploadImageToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(url, {
    method: "POST",
    body: formData
  });
  const data = await res.json();
  if (!data.secure_url) throw new Error("Upload failed: " + (data.error?.message || "unknown"));
  return data.secure_url;
}

const adminUsers = {
  "admin": { password: "yourpassword", name: "Admin", role: "super" },
  "bear": { password: "gentle123", name: "Gentle Bear", role: "admin" }
};

// -- AdminPanel class and all code copied from previous messages --
// Paste all from the full AdminPanel source provided above.
