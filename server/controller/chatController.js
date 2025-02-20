const Message = require("../model/messageModel");


exports.messages = async (req, res) => {
    try {
        const messages = new Message(req.body);
        await messages.save();

        res.status(201).json({ Message: messages });
    } catch (error) {
        res.status(500).json({ error: "Error fetching messages" });
    }
}

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(201).json({ Message: messages });
    } catch (error) {
        res.status(500).json({ error: "Error fetching messages" });
    }
};
