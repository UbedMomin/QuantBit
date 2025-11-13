//Handles image uploads (optional)

// uploadController.js
export const uploadPhoto = (req, res) => {
  try {
    res.status(200).json({
      message: "File uploaded successfully",
      filePath: `/uploads/site_photos/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
