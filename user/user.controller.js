import asyncHandler from 'express-async-handler';
const UserService = require('./user.service');

export const register = asyncHandler(async (req, res, next) => {
  await UserService.createUser(req.body);
  res.status(200).json({ data: req.body, message: 'User registered successfully.' });
});

export const login = asyncHandler(async (req, res, next) => {
  const user = await UserService.login(req.body);
  return res.status(200).json({ data: user, message: 'Login is successfull.' });
});
