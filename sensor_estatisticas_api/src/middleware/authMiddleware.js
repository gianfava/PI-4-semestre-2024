function authMiddleware(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res
			.status(401)
			.json({ message: "Token de autenticação ausente" });
	}

	const token = authHeader.split(" ")[1];
	if (!token) {
		return res.status(401).json({ message: "Formato de token inválido" });
	}

	req.token = token;
	next();
}

module.exports = authMiddleware;
