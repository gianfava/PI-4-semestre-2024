const axios = require("axios");
const config = require("../../../config/config");

const API_BASE_URL = config.userApiBaseUrl;

async function register(userData) {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/users/register`,
			userData
		);
		return response.data;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
}

async function login(credentials) {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/users/login`,
			credentials
		);
		return response.data;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
}

async function getUsers(token) {
	try {
		const response = await axios.get(`${API_BASE_URL}/users`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
}

async function getUser(id, token) {
	try {
		const response = await axios.get(`${API_BASE_URL}/users/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
}

async function updateUser(id, userData, token) {
	try {
		const response = await axios.put(
			`${API_BASE_URL}/users/${id}`,
			userData,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		return response.data;
	} catch (error) {
		throw error.response ? error.response.data : error;
	}
}

async function deleteUser(id, token) {
	try {
		await axios.delete(`${API_BASE_URL}/users/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		});
	} catch (error) {
		throw error.response ? error.response.data : error;
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
