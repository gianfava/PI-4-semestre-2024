// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const { JWT_SECRET } = process.env;

// Rota de Registro
router.post("/register", async (req, res) => {
	const { cpf, name, email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "Email já cadastrado" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			cpf,
			name,
			email,
			password: hashedPassword,
		});

		await newUser.save();
		res.status(201).json({ message: "Usuário registrado com sucesso" });
	} catch (error) {
		res.status(500).json({ message: "Erro no servidor" });
	}
});

// Rota de Login
router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Credenciais inválidas" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ message: "Credenciais inválidas" });
		}

		const token = jwt.sign({ id: user._id }, JWT_SECRET, {
			expiresIn: "1h",
		});
		res.json({ token });
	} catch (error) {
		res.status(500).json({ message: "Erro no servidor" });
	}
});

module.exports = router;
