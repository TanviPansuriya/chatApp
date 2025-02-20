const express = require("express");
const { getConnectedUsers, getMessages, sendMessage } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// router.get("/connected-users", authMiddleware, getConnectedUsers);
// router.post("/getMessages", authMiddleware, getMessages);
router.post('/send', authMiddleware, sendMessage);


module.exports = router;





// // Send message
// router.post('/send', authMiddleware, sendMessage);

// // Get chat between two users
// router.get('/chat/:senderId/:receiverId', authMiddleware, getChat);

// // Mark messages as read
// router.put('/mark-read', authMiddleware, markAsRead);

// module.exports = router;
