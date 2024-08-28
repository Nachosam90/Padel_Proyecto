const multer = require("multer"); // recoje lo que viene y lo puede mandar
const cloudinary = require("cloudinary").v2 // instancia de donde lo voy a mandar
const { CloudinaryStorage } = require("multer-storage-cloudinary") // tipos de ficheros y donde lo voy a guardar

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "users",
        allowedFormats: ["jpg", "png", "jpeg", "gif", "webp"]
    }
});
const upload = multer({ storage });

module.exports = upload

// Todo esto es tema de configuración