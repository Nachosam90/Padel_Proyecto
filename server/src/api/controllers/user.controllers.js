const User = require("../models/user.model")

const addUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const createdUser = await newUser.save();

        return res.status(200).json({ message: "Usuario creado", data: createdUser })

    } catch (error) {
        console.log(error)

    }
}

const login = async (req, res) => {
    try {
        const user = req.body;
        const userByEmail = await User.find({ email: user.email })

        if (userByEmail.length !== 0) {

            if (bcrypt.compareSync(user.password, userByEmail[0].password)) {
                //crear el token y retornarlo
                const data = { id: userByEmail[0]._id, email: userByEmail[0].email }
                const token = generateToken(data)
                return res.status(200).json({ message: token })

            } else {
                return res.status(200).json({ message: "La contrasena no coincide" })
            }

        } else {
            return res.status(200).json({ message: "El email o existe" })
        }

    } catch (error) {
        console.log(error)
    }

}

const addPalasToUser = async (req, res) => {
    const { idP, idU } = req.params;
    console.log(idP, idU)

    const modifyUser = await User.findByIdAndUpdate(
        idU,
        { $push: { palas: idP } },
        { new: true })
    if (!modifyUser) {
        return res.json({ message: "Usuario no encontrado" })
    } else {
        return res.json({ message: "Usuario modificado con exito", data: modifyUser })
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    const users = await User.findById(id).populate("palas")
    if (!users) {
        return res.json({ messagge: "usuario no existe" })
    } else {
        return res.json({ data: user })
    }
}

const deletePalasUser = async (req, res) => {
    const { idP, idU } = req.params;

    const updateUser = await User.findByIdAndUpdate(
        idU,
        { $pull: { palas: idP } },
        { new: true }
    )
    return res.json({ data: updateUser })

}

const deleteUser = async (req, res) => {

    const { id } = req.params;

    const deleted = await User.findByIdAndDelete(id)
    if (!deleted) {
        return res.json({ message: "el id no existe" })
    }

    if (deleted.image) {
        deleteFile(deleted.image)
    }

    return res.json({ deleted })
}

module.exports = { login, addUser, addPalasToUser, getUserById, deletePalasUser, deleteUser };