import { Router } from 'express'
import { errCatcher } from '../../Middlewares/comon.middleware'
import { SendCode, VerifyCode } from './services/auth.services'

const AuthRouter = Router()

AuthRouter.post('/sendCode', errCatcher(SendCode))
AuthRouter.post('/verifyCode', errCatcher(VerifyCode))

export { AuthRouter }
