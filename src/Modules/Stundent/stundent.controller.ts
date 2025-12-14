import { Router } from 'express'
import { errCatcher } from '../../Middlewares/comon.middleware'
import { getStudentById, getStudentHistory } from './services/stundent.services'

const StudentRouter = Router()

StudentRouter.post('/getById', errCatcher(getStudentById))
StudentRouter.post('/studentHistory', errCatcher(getStudentHistory))

export { StudentRouter }
