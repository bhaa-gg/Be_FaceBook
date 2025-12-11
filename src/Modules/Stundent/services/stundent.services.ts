import { NextFunction, Request, Response } from 'express'
import { StudentModel } from '../../../DB/Models/student.model'
import { AttendanceModel } from '../../../DB/Models/attendance.model'

export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
  const { studentId } = req.body
  const user = await StudentModel.findOne({ fingerId: studentId })
  console.log({ studentId })
  console.log({ user })

  if (!user) return res.status(404).send('red')
  return res.status(200).send({ user: user, now: new Date() })
}

export const getStudentHistory = async (req: Request, res: Response, next: NextFunction) => {
  const { studentId, instructorId } = req.body
  
  if(!studentId || !instructorId) return res.status(404).json({ message: 'Please Fill All Fields' })
  const student = await StudentModel.findById(studentId)
  if (!student) return res.status(404).json({ message: 'student not found' })

  const activeHistory = await AttendanceModel.find({
    studentId: student._id,
    instructorId: instructorId,
  }).sort({ createdAt: -1 })

  return res.status(200).send({ message : "Success",student,activeHistory })
}
