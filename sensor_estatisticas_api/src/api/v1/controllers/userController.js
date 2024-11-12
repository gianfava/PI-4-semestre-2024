const userService = require("../services/userService");

async function register(req, res) {
	try {
		const result = await userService.register(req.body);
		res.status(201).json(result);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

async function login(req, res) {
	try {
		const result = await userService.login(req.body);
		res.json(result);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

async function getUsers(req, res) {
	try {
		const users = await userService.getUsers(req.token);
		res.json(users);
	} catch (error) {
		res.status(401).json({ message: error.message });
	}
}

async function getUser(req, res) {
	try {
		const user = await userService.getUser(req.params.id, req.token);
		res.json(user);
	} catch (error) {
		if (error.response && error.response.status === 404) {
			res.status(404).json({ message: "Usuário não encontrado" });
		} else {
			res.status(500).json({ message: error.message });
		}
	}
}

async function updateUser(req, res) {
	try {
		const updatedUser = await userService.updateUser(
			req.params.id,
			req.body,
			req.token
		);
		res.json(updatedUser);
	} catch (error) {
		if (error.response && error.response.status === 403) {
			res.status(403).json({
				message: "Não autorizado a atualizar outro usuário",
			});
		} else if (error.response && error.response.status === 404) {
			res.status(404).json({ message: "Usuário não encontrado" });
		} else {
			res.status(500).json({ message: error.message });
		}
	}
}

async function deleteUser(req, res) {
	try {
		await userService.deleteUser(req.params.id, req.token);
		res.status(204).send();
	} catch (error) {
		if (error.response && error.response.status === 403) {
			res.status(403).json({
				message: "Não autorizado a excluir outro usuário",
			});
		} else if (error.response && error.response.status === 404) {
			res.status(404).json({ message: "Usuário não encontrado" });
		} else {
			res.status(500).json({ message: error.message });
		}
	}
}

module.exports = {
	register,
	login,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
};
