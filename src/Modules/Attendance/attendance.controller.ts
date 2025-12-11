import { Router } from 'express'
import { errCatcher } from '../../Middlewares/comon.middleware'
import { takeAttendance } from './services/attendance.services'

const AttendanceRouter = Router()

AttendanceRouter.post('/', errCatcher(takeAttendance))
 
export { AttendanceRouter }
