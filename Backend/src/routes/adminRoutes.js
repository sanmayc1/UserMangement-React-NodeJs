import express from 'express'
import { login,dataFetch ,deleteUser} from '../controller/adminController.js';
const adminRoutes =express.Router()

adminRoutes.post('/login',login)
adminRoutes.get('/usersdata',dataFetch)
adminRoutes.post('/deleteuser',deleteUser)

export default adminRoutes;