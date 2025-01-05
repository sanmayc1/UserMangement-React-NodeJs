import express from 'express'
import { login,dataFetch ,deleteUser,addNewUser, editUser} from '../controller/adminController.js';
import validtion from '../middleware/validation.js';
import verifyToken from '../middleware/jwtVerify.js';
const adminRoutes =express.Router()

adminRoutes.post('/login',login)
adminRoutes.get('/usersdata',verifyToken,dataFetch)
adminRoutes.post('/deleteuser',verifyToken,deleteUser)
adminRoutes.post('/adduser',verifyToken,validtion,addNewUser)
adminRoutes.patch('/edituser/:id',verifyToken,editUser)
export default adminRoutes;