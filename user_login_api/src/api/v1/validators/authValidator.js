const { body } = require("express-validator");

exports.register = [
	body("cpf").notEmpty().withMessage("CPF é obrigatório"),
	body("name").notEmpty().withMessage("Nome é obrigatório"),
	body("email").isEmail().withMessage("Email inválido"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("A senha deve ter no mínimo 6 caracteres"),
];

exports.login = [
	body("email").isEmail().withMessage("Email inválido"),
	body("password").notEmpty().withMessage("Senha é obrigatória"),
];

exports.updateProfile = [
	body("name").optional().notEmpty().withMessage("Nome não pode ser vazio"),
	body("email").optional().isEmail().withMessage("Email inválido"),
	body("password")
		.optional()
		.isLength({ min: 6 })
		.withMessage("A senha deve ter no mínimo 6 caracteres"),
];
