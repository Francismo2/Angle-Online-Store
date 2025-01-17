import express from 'express';

import { loginUser, registerUser, adminLogin, verifyEmail, verifyCode, resetPassword, verifyAndCreateUser } from '../controllers/userController.js';

const userRouter = express.Router();


// REGISTRATION
userRouter.post('/register', registerUser);
userRouter.post('/register/verify', verifyAndCreateUser);

// LOGIN
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);

// FORGOT PASSWORD
userRouter.post('/forgot-password/verify-email', verifyEmail);
userRouter.post('/forgot-password/verify-code', verifyCode);
userRouter.post('/forgot-password/reset-password', resetPassword);

export default userRouter;
