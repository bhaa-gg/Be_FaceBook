import { Router } from 'express'
import { errCatcher } from '../../Middlewares/comon.middleware'
import { getInstructors } from './services/instructor.services'

const InstructorRouter = Router()

InstructorRouter.get('/', errCatcher(getInstructors))

export { InstructorRouter }
