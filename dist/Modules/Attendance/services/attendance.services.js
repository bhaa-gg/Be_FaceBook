"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeAttendance = void 0;
const student_model_1 = require("../../../DB/Models/student.model");
const section_model_1 = require("../../../DB/Models/section.model"); // ✅ Add this line
const lecture_model_1 = require("../../../DB/Models/lecture.model");
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const attendance_model_1 = require("../../../DB/Models/attendance.model");
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
const takeAttendance = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fingerId } = req.body;
    const student = yield student_model_1.StudentModel.findOne({ fingerId });
    if (!student)
        return res.status(404).json({ message: 'Student not found' });
    const sectionFromUserId = yield section_model_1.SectionModel.findOne({ students: { $in: [student._id] } });
    if (!sectionFromUserId)
        return res.status(404).json({ message: 'This user is not in any section' });
    const dateNow = new Date();
    const todayArabic = (0, date_fns_1.format)(dateNow, 'EEEE', { locale: locale_1.ar });
    const currentTime = (0, date_fns_1.format)(dateNow, 'HH:mm');
    const schedule = {
        day: 'الاثنين',
        from: '10:30', // set(new Date(), { hours: 10, minutes: 30 }),
        to: '12:00', // set(new Date(), { hours: 12, minutes: 0 }),
    };
    const lecturesForDay = yield lecture_model_1.LectureModel.findOne({
        sectionId: sectionFromUserId._id,
        lectureTime: schedule,
        // 'lectureTime.day': todayArabic,
        // 'lectureTime.from': { $lte: currentTime },
        // 'lectureTime.to': { $gte: currentTime },
    });
    if (sectionFromUserId._id.toString() !== (lecturesForDay === null || lecturesForDay === void 0 ? void 0 : lecturesForDay.sectionId).toString())
        return res.status(404).json({ message: 'This user is not in this section' });
    if (!lecturesForDay)
        return res.status(404).json({ message: 'This section has no lectures now' });
    const isUserExistInLecture = yield attendance_model_1.AttendanceModel.findOne({
        lectureId: lecturesForDay._id,
        studentId: student._id,
    });
    if (isUserExistInLecture && (0, date_fns_1.isSameDay)(new Date(isUserExistInLecture.date), new Date())) {
        return res.status(400).json({ message: 'User already marked present for this lecture today' });
    }
    const TheAttendance = yield attendance_model_1.AttendanceModel.create({
        lectureId: lecturesForDay._id,
        studentId: student._id,
        instructorId: lecturesForDay.instructorId,
        status: 'Present',
        date: new Date(),
    });
    return res.status(200).json({
        message: 'Attendance marked successfully',
        lecture: lecturesForDay,
        attendance: TheAttendance,
    });
});
exports.takeAttendance = takeAttendance;
