// import multer from "multer";


// const storage = multer.diskStorage({

//     destination: function (req, file, cb) {
//       cb(null, './public')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.originalname)
//     }
//   })
  
//   export const upload = multer({ storage: storage })



import multer from 'multer';
import fs from 'fs';

// Define the storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      const uploadPath = './public'; // Folder to store the files

      // Check if the folder exists, if not create it
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath); // Set the folder destination
    } catch (err) {
      console.error("Error in destination function:", err);
      cb(err, null); // Pass error to callback
    }
  },

  filename: function (req, file, cb) {
    try {
      // Generate a unique file name
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileName = uniqueSuffix + '-' + file.originalname;

      cb(null, fileName); // Set the file name
    } catch (err) {
      console.error("Error in filename function:", err);
      cb(err, null); // Pass error to callback
    }
  }
});

// Define and export the upload middleware
export const upload = multer({
  storage: storage, // Use the storage configuration
  fileFilter: (req, file, cb) => {
    try {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Only image files are allowed"), false);
      }
      cb(null, true); // Accept the file
    } catch (err) {
      console.error("Error in file filter:", err);
      cb(err, false);  // Reject the file
    }
  }
});


