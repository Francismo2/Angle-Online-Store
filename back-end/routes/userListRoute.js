import express from 'express'
import { listUser, removeUser } from '../controllers/usersListController.js'
import adminAuth from '../middleware/adminAuth.js'

const userListRouter = express.Router();

userListRouter.get('/list', adminAuth, listUser);
userListRouter.post('/remove', adminAuth, removeUser);

export default userListRouter