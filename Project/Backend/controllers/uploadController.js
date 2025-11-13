// controllers/uploadController.js
export const uploadPhoto = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      fileUrl: req.file.path,   // CLOUDINARY URL
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
