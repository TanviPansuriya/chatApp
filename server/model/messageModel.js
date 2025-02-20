const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId: {
        type: String
    },
    receiverId: {
        type: String
    },
    message:{
        type: String
    },
    isRead:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
});
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
