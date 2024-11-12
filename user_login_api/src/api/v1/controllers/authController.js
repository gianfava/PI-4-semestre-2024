const authService = require("../services/authService");
const AppError = require("../../../utils/errors");

exports.register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await authService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await authService.getUserProfile(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Verificar se o usuário autenticado está tentando atualizar seu próprio perfil
    if (req.user.id !== id) {
      throw new AppError("Não autorizado a atualizar outro usuário", 403);
    }
    const updatedUser = await authService.updateUserProfile(id, req.body);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Verificar se o usuário autenticado está tentando excluir sua própria conta
    if (req.user.id !== id) {
      throw new AppError("Não autorizado a excluir outro usuário", 403);
    }
    await authService.deleteUserAccount(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};