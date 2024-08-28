const cloudinary = require("cloudinary").v2
const deleteFile = (url) => {
    //https://res.cloudinary.com/duhmnz7do/image/upload/v1723475990/cld-sample.jpg
    const imgSplit = url.split("/");
    const nameImg = imgSplit[imgSplit.length - 1] //cld-sample.jpg
    const nameImgSplit = nameImg.split(".") // [cld-sample, jpg]
    const folder = imgSplit[imgSplit.length - 2] //carpeta en la que este la imagen

    /// -->  nombrecarpetacontenedora/ imagen --> esto es lo que necesita cloudinary
    const imgToDelete = `${folder}/${nameImgSplit[0]}`
    cloudinary.uploader.destroy(imgToDelete, () => {
        console.log("imagen eliminada")
    })
}

module.exports = { deleteFile }