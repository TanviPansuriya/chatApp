const express = require("express");
const { messages,getMessages } = require("../controller/chatController");
const router = express.Router();

router.post("/add",messages);
router.get("/", getMessages);

module.exports = router;
