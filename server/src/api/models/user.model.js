const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    product: { type: String },
    opinion: { type: String }
});

// Encriptar la contraseña 
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Comparar la contraseña puesta con la registrada
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);

// No me queda claro cual seria la marena más correcta de ponerlo
// const User = mongoose.model("user", userSchema)
// module.exports = User;