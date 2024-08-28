//verificar si el token esta bien
const { verifyToken } = require("../utils/jwt")
const User = require("../api/models/user.model")

const isAdmin = async (req, res) => {
    const authorization = req.headers.authorization
    //Bearer 

    if (!authorization) {
        return res.json({ message: "No está autorizado" })
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        return res.json({ message: "No hay token" })
    }

    const tokenVerify = verifyToken(token);
    if (!tokenVerify.id) {
        return res.json({ message: "no existe el id del usuario" })
    }
    const logged = await User.findById(tokenVerify.id);
    if (logged.role != "admin") {
        return res.json({ message: "Tu rol no es admin, y no tienes permiso" })
    }
    req.dataUser = logged;
    next()
}
const isAuth = async (req, res) => {
    const authorization = req.headers.authorization
    //Bearer 

    if (!authorization) {
        return res.json({ message: "No está autorizado" })
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        return res.json({ message: "No hay token" })
    }

    const tokenVerify = verifyToken(token);
    if (!tokenVerify.id) {
        return res.json({ message: "no existe el id del usuario" })
    }
    const logged = await User.findById(tokenVerify.id);
    if (logged.role != "admin") {
        return res.json({ message: "Tu rol no es admin, y no tienes permiso" })
    }
    req.dataUser = logged;
    next()
}
module.exports = { isAuth, isAdmin }