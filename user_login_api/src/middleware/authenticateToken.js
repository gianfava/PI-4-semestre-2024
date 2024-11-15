const jwt = require("jsonwebtoken");
const AppError = require("../utils/errors");

module.exports = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return next(new AppError("Token de autenticação não fornecido", 401));
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return next(new AppError("Token de autenticação inválido", 403));
		}
		req.user = user;
		next();
	});
};
