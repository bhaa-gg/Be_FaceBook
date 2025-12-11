import { NextFunction, Request, Response } from 'express'
import { StudentModel } from '../../../DB/Models/student.model'
import { SectionModel } from '../../../DB/Models/section.model' // ✅ Add this line
import { LectureModel } from '../../../DB/Models/lecture.model'
import { format, isSameDay } from 'date-fns'
import { ar } from 'date-fns/locale'
import { AttendanceModel } from '../../../DB/Models/attendance.model'

// export const takeAttendance = async (req: Request, res: Response, next: NextFunction) => {
//   const { fingerId } = req.body

//   const student = await StudentModel.findOne({ fingerId })

//   if (!student) return res.status(404).json({ message: 'Student not found' })

//   const sectionFromUserId = await SectionModel.findOne({
//     students: { $in: [student._id] },
//   })

//   if (!sectionFromUserId)
//     return res.status(404).json({ message: 'This user is not in any section' })

//   const dateNow = new Date()
//   const todayArabic = format(dateNow, 'EEEE', { locale: ar })
//   const currentTime = format(dateNow, 'HH:mm')

//   const lecturesForDay = await LectureModel.findOne({
//     sectionId: sectionFromUserId._id,
//     'lectureTime.day': todayArabic,
//     'lectureTime.from': { $lte: currentTime },
//     'lectureTime.to': { $gte: currentTime },
//   })

//   if (!lecturesForDay) return res.status(404).json({ message: 'This section has no lectures Now' })

//   const isUserExistInLecture = await AttendanceModel.findOne({
//     lectureId: lecturesForDay._id,
//     studentId: student._id,
//   })

//   if (isUserExistInLecture && isSameDay(new Date(isUserExistInLecture?.date), new Date())) {
//     return res.status(400).json({ message: 'User already exists in this lecture' })
//   }
//   const TheAttendance = await AttendanceModel.create({
//     lectureId: lecturesForDay._id,
//     studentId: student._id,
//     status: 'Present',
//     date: new Date(),
//   })

//   return res.status(200).json({ TheAttendance })
// }

export const takeAttendance = async (req: Request, res: Response, next: NextFunction) => {
  const { fingerId } = req.body

  const student = await StudentModel.findOne({ fingerId })
  if (!student) return res.status(404).json({ message: 'Student not found' })

  const sectionFromUserId = await SectionModel.findOne({ students: { $in: [student._id] } })
  if (!sectionFromUserId)
    return res.status(404).json({ message: 'This user is not in any section' })

  const dateNow = new Date()
  const todayArabic = format(dateNow, 'EEEE', { locale: ar })
  const currentTime = format(dateNow, 'HH:mm')

  // const schedule = {
  //   day: 'الاثنين',
  //   from: set(new Date(), { hours: 10, minutes: 30 }),
  //   to: set(new Date(), { hours: 12, minutes: 0 }),
  // }

  const lecturesForDay = await LectureModel.findOne({
    sectionId: sectionFromUserId._id,
    'lectureTime.day': todayArabic,
    'lectureTime.from': { $lte: currentTime },
    'lectureTime.to': { $gte: currentTime },
  })

  if (sectionFromUserId._id !== lecturesForDay?.sectionId)
    return res.status(404).json({ message: 'This user is not in this section' })

  if (!lecturesForDay) return res.status(404).json({ message: 'This section has no lectures now' })

  const isUserExistInLecture = await AttendanceModel.findOne({
    lectureId: lecturesForDay._id,
    studentId: student._id,
  })

  if (isUserExistInLecture && isSameDay(new Date(isUserExistInLecture.date), new Date())) {
    return res.status(400).json({ message: 'User already marked present for this lecture today' })
  }

  const TheAttendance = await AttendanceModel.create({
    lectureId: lecturesForDay._id,
    studentId: student._id,
    instructorId: lecturesForDay.instructorId,
    status: 'Present',
    date: new Date(),
  })

  return res.status(200).json({
    message: 'Attendance marked successfully',
    lecture: lecturesForDay,
    attendance: TheAttendance,
  })
}
