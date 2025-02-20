const Message = require("../model/messageModel");

const connectedUsers = {};
exports.getConnectedUsers = (req, res) => {
    console.log("Connected Users:", connectedUsers);
    return res.json({ connectedUsers });
};

exports.handleUserConnection = (io) => {
    // io.on("connection", (socket) => {
    //     console.log(`User connected: ${socket.id}`);

    //     socket.on("user-online", (username) => {
    //         if (username) {
    //             connectedUsers[username] = socket.id;
    //             // io.emit("update-users", connectedUsers);
    //         }
    //     });

    //     socket.on("disconnect", () => {
    //         console.log(`User disconnected: ${socket.id}`);
    //     });
    // });

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);
    
        socket.on("send-message", (data) => {
            io.to(data.receiverId).emit("receive-message", data);
            io.emit("receive-message", data);
        });
    
        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });
};


exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.save(req.body);
        // socket.on("send-msg", (username) => {
        //     if (username) {
        //         connectedUsers[username] = socket.id;
        //         // io.emit("update-users", connectedUsers);
        //     }
        // });

        // socket.on("sendMessage", (message) => {
        //     console.log(message);
        //     io.emit("receiveMessage", message);
        // });

        res.status(201).json({ Message: messages });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getMessages = async (req, res) => {
    try {
        const messages = await new Message.save(req.body);
        res.status(201).json({ Message: messages });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, message } = req.body;

        const newMessage = new Message({ senderId, receiverId, message });
        await newMessage.save();

        io.to(receiverId).emit("receive-message", newMessage);

        if (!receiverId) {
            return res.status(400).json({ success: false, message: "receiverId is required" });
        }
        console.log(receiverId)

        res.status(201).json({ message: "Message sent", data: newMessage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Chat Between Two Users
exports.getChat = async (req, res) => {
    const { senderId, receiverId } = req.params;

    try {
        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ timestamp: 1 });

        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

