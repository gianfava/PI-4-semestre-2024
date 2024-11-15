const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../../../utils/errors");

exports.registerUser = async (userData) => {
  const { cpf, name, email, password } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email já cadastrado", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    cpf,
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  return { message: "Usuário registrado com sucesso" };
};

exports.loginUser = async (credentials) => {
  const { email, password } = credentials;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Credenciais inválidas", 400);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError("Credenciais inválidas", 400);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return { token };
};

exports.getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

exports.getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new AppError("Usuário não encontrado", 404);
  }
  return user;
};

exports.updateUserProfile = async (userId, updateData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("Usuário não encontrado", 404);
  }

  if (updateData.name) user.name = updateData.name;
  if (updateData.email) user.email = updateData.email;
  if (updateData.password) {
    user.password = await bcrypt.hash(updateData.password, 10);
  }

  await user.save();
  return user.toObject({ versionKey: false, transform: (doc, ret) => { delete ret.password; return ret; }});
};

exports.deleteUserAccount = async (userId) => {
  const result = await User.findByIdAndDelete(userId);
  if (!result) {
    throw new AppError("Usuário não encontrado", 404);
  }
};