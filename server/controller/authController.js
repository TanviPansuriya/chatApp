const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", User: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });
        // console.log(process.env.JWT_SECRET);

        const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // req.app.get("io").emit("user-login", user.username);

        res.json({ message: "Login successful", token });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllUsers=async(req,res)=>{
    try {
            const users = await User.find();
            res.status(200).json(users);
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
};



// // // API to get all users
// // app.get('/users', async (req, res) => {
// //   try {
// //     const users = await User.find();
// //     res.status(200).json(users);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error fetching users' });
// //   }
// // });


// // // Socket.io for real-time chat functionality
// // let users = [];

// // io.on('connection', (socket) => {
// //   console.log('A user connected');

// //   socket.on('disconnect', () => {
// //     console.log('A user disconnected');
// //     users = users.filter(user => user.socketId !== socket.id);  // Remove disconnected user
// //     io.emit('user-list', users);  // Notify clients about updated user list
// //   });

// //   socket.on('new-user', (username) => {
// //     users.push({ username, socketId: socket.id });  // Add new user to users list
// //     io.emit('user-list', users);  // Send updated user list to all clients
// //   });

// //   socket.on('chat-message', (message) => {
// //     io.emit('chat-message', message);  // Broadcast message to all clients
// //   });
// // });

// // // New API: Get all connected users
// // app.get('/connected-users', authenticateToken, (req, res) => {
// //   // Return all connected users
// //   res.status(200).json(users);
// // });

// // // Start server
// // server.listen(3000, () => {
// //   console.log('Server running on port 3000');
// // });