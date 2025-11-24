import Express from 'express'
import { getAllUsers, getSingleUsers } from '../controllers/User.js'
import { extraJwt } from './Common.js'

const UserRouter = new Express.Router()

UserRouter.use(extraJwt)
UserRouter.get('/', getAllUsers)
UserRouter.get('/getUsers', getSingleUsers)
//UserRouter.get('/me', getUsers)

export { UserRouter }