import express, { Request, Response } from 'express'
import { dbConnection } from './DB/Connection'
import { AttendanceRouter } from './Modules/Attendance/attendance.controller'
import { SectionRouter } from './Modules/Sections/sections.controller'
import { StudentRouter } from './Modules/Stundent/stundent.controller'
import { AuthRouter } from './Modules/Auth/auth.controller'
import { config } from 'dotenv'
import { InstructorRouter } from './Modules/Instructor/instructor.controller'
import axios from 'axios'
const app = express()
config()
const port = process.env.PORT || 4000
dbConnection()

app.use(express.json())

app.use('/attendance', AttendanceRouter)
app.use('/section', SectionRouter)
app.use('/students', StudentRouter)
app.use('/auth', AuthRouter)
app.use('/instructors', InstructorRouter)

let a = true
app.post('/runSensor', async (req: Request, res: Response) => {
  await axios.post('http://192.168.1.10/runSensor', {
    sensorState: true,
  })
  return res.send('Success')
})
app.get('/', (req: Request, res: Response) => res.send('Hello World!'))

app.use((req: Request, res: Response) =>
  res.status(404).json({
    message: 'Page Not Found',
  }),
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
