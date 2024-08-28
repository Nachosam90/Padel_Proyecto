const express = require("express");
const router = express.Router()
const { login, addUser, addPalasToUser, getUserById, deletePalasUser, deleteUser } = require("../controllers/user.controllers")
const upload = require("../../middleware/upload")
const { isAuth, isAdmin } = require("../../middleware/auth")

router.post("/add", upload.single("image"), addUser);
router.post("/login", login);
router.get("/:id", [isAuth], getUserById);
router.delete("/deleteuser", [isAdmin], deleteUser);
router.put("/add/:idU/:idP", [isAuth], addPalasToUser);
router.put("/delete/:idU/:idP", [isAuth], deletePalasUser);
module.exports = router