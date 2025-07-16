// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const UserModel = require('./models/Users');
// const UserLoginModel = require('./models/UserLogin');

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect("mongodb+srv://dharani:dharani%4031@cluster0.ozm5r.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0");

// // ✅ All your previous CRUD routes for Users
// app.get('/', (req, res) => {
//     UserModel.find({})
//         .then(users => res.json(users))
//         .catch(err => res.json(err));
// });

// app.get('/getUser/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findById({ _id: id })
//         .then(users => res.json(users))
//         .catch(err => res.json(err));
// });

// app.put('/updateUser/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findByIdAndUpdate({ _id: id }, {
//         name: req.body.name,
//         email: req.body.email
//     })
//         .then(users => res.json(users))
//         .catch(err => res.json(err));
// });

// app.delete('/deleteUser/:id', (req, res) => {
//     const id = req.params.id;
//     UserModel.findByIdAndDelete({ _id: id })
//         .then(response => res.json(response))
//         .catch(err => res.json(err));
// });

// app.post("/createUser", (req, res) => {
//     UserModel.create(req.body)
//         .then(users => res.json(users))
//         .catch(err => res.json(err));
// });

// // ✅ Register route with name, email, password
// // ✅ Register route with duplicate email check
// app.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;
//     try {
//         // 👇 Check if user already exists
//         const existingUser = await UserLoginModel.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: 'User already exists with this email' });
//         }

//         // 👇 Hash password and save
//         const hash = await bcrypt.hash(password, 10);
//         const newUser = await UserLoginModel.create({ name, email, password: hash });
//         res.json({ success: true, user: newUser });
//     } catch (err) {
//         console.error("Register error:", err.message);
//         res.status(500).json({ error: 'Server error during registration' });
//     }
// });


// // ✅ Login route
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await UserLoginModel.findOne({ email });
//         if (!user) return res.status(400).json({ error: 'User not found' });

//         const valid = await bcrypt.compare(password, user.password);
//         if (!valid) return res.status(401).json({ error: 'Invalid password' });

//         res.json({ message: 'Login successful', user });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.listen(3001, () => {
//     console.log("Server is running on port 3001");
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const UserModel = require('./models/Users');
const UserLoginModel = require('./models/UserLogin');


// ✅ Load environment variables
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ All CRUD routes
app.get('/', (req, res) => {
    UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, {
        name: req.body.name,
        email: req.body.email
    })
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({ _id: id })
        .then(response => res.json(response))
        .catch(err => res.json(err));
});

app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

// ✅ Register
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await UserLoginModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = await UserLoginModel.create({ name, email, password: hash });
        res.json({ success: true, user: newUser });
    } catch (err) {
        console.error("Register error:", err.message);
        res.status(500).json({ error: 'Server error during registration' });
    }
});

// ✅ Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserLoginModel.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: 'Invalid password' });

        res.json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Start server
app.listen(3001, () => {
    console.log("🚀 Server is running on port 3001");
});
