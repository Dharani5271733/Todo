// const mongoose = require('mongoose');

// const UserLoginSchema = new mongoose.Schema({
//     name: { type: String, required: true },       // ✅ Add name here
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });

// const UserLoginModel = mongoose.model('userlogins', UserLoginSchema);
// module.exports = UserLoginModel;
const mongoose = require('mongoose');

const UserLoginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('UserLogin', UserLoginSchema);

