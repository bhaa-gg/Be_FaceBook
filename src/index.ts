import express, { Request, Response } from 'express'
import { dbConnection } from './DB/Connection'
import { AttendanceRouter } from './Modules/Attendance/attendance.controller'
import { SectionRouter } from './Modules/Sections/sections.controller'
import { StudentRouter } from './Modules/Stundent/stundent.controller'
import { AuthRouter } from './Modules/Auth/auth.controller'
import { config } from 'dotenv'
import { InstructorRouter } from './Modules/Instructor/instructor.controller'

config()

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())

app.use('/attendance', AttendanceRouter)
app.use('/section', SectionRouter)
app.use('/students', StudentRouter)
app.use('/auth', AuthRouter)
app.use('/instructors', InstructorRouter)

let sensorState = false

app.post('/runSensor', (req, res) => {
  sensorState = req.body.sensorState
  return res.json({ status: 'ok' })
})

app.get('/sensorState', (req, res) => {
  return res.json({ sensorState })
})

app.get('/', (req: Request, res: Response) => res.send('Hello in Attendance system!'))

app.use((req: Request, res: Response) =>
  res.status(404).json({
    message: 'Page Not Found',
  }),
)

const startServer = async () => {
  try {
    await dbConnection()

    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()
