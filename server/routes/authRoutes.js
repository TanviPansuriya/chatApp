const express = require("express");
const { register, login, getAllUsers,getConnectedUser} = require("../controller/authController");
const router = express.Router();
const authMiddleware=require("../middleware/authMiddleware")

router.post("/register", register);
router.post("/login", login);
router.get("/getAll", getAllUsers);
// router.get("/getUsers",authMiddleware, getConnectedUser);

module.exports = router;
