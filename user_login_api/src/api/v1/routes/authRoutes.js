const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authValidator = require("../validators/authValidator");
const validateRequest = require("../../../middleware/validateRequest");
const authenticateToken = require("../../../middleware/authenticateToken");

router.post(
	"/users/register",
	authValidator.register,
	validateRequest,
	authController.register
);
router.post(
	"/users/login",
	authValidator.login,
	validateRequest,
	authController.login
);
router.get("/users", authenticateToken, authController.getAllUsers);
router.get("/users/:id", authenticateToken, authController.getUserById);
router.put(
	"/users/:id",
	authenticateToken,
	authValidator.updateProfile,
	validateRequest,
	authController.updateProfile
);
router.delete("/users/:id", authenticateToken, authController.deleteAccount);

module.exports = router;
