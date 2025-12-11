import { NextFunction, Request, Response } from 'express'
import { StudentModel } from '../../../DB/Models/student.model'
import { SectionModel } from '../../../DB/Models/section.model'
import { AttendanceModel } from '../../../DB/Models/attendance.model'
import { LEC_DAYS } from '../../../Utils/constant.utils'

export const addStudentToSection = async (req: Request, res: Response, next: NextFunction) => {
  const { sectionId } = req.body
  const students = await StudentModel.find({ sectionId }).select('_id')
  if (!students) return res.status(404).json({ message: 'no student found in this section' })
  const ids = students.map((student) => student._id)
  const toSection = await SectionModel.findOneAndUpdate(
    { _id: sectionId },
    { students: ids },
    { new: true },
  )

  if (!toSection) return res.status(404).json({ message: 'section not found' })

  return res.status(200).json({
    message: 'section updated successfully',
    section: toSection,
  })
}

export const getSection = async (req: Request, res: Response, next: NextFunction) => {
  const { sectionId, instructorId } = req.body

  const section = await SectionModel.findOne({ _id: sectionId }).populate('students')
  if (!section) return res.status(404).json({ message: 'section not found' })

  const studentsWithAttendance = await Promise.all(
    section.students.map(async (student: any) => {
      const countAttend = await AttendanceModel.countDocuments({
        studentId: student._id,
        instructorId: instructorId,
      })

      return {
        ...student.toObject(),
        countAttendPercent: (countAttend / LEC_DAYS) * 100,
      }
    }),
  )

  return res.status(200).json({
    message: 'section found successfully',
    sectionId: section._id,
    sectionName: section.sectionName,
    section: studentsWithAttendance,
  })
}

export const getSections = async (req: Request, res: Response, next: NextFunction) => {

  const sections = await SectionModel.find().select('-students') ;
  if (!sections) return res.status(404).json({ message: 'No Sections Found' })
  return res.status(200).json({
    message: 'section found successfully',
    sections
  })
}
