const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../../../middleware/authMiddleware");

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", authMiddleware, userController.getUsers);
router.get("/:id", authMiddleware, userController.getUser);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
