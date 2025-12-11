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
exports.getStudentHistory = exports.getStudentById = void 0;
const student_model_1 = require("../../../DB/Models/student.model");
const attendance_model_1 = require("../../../DB/Models/attendance.model");
const getStudentById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.body;
    const user = yield student_model_1.StudentModel.findOne({ fingerId: studentId });
    console.log({ studentId });
    console.log({ user });
    if (!user)
        return res.status(404).send('red');
    return res.status(200).send({ user: user, now: new Date() });
});
exports.getStudentById = getStudentById;
const getStudentHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, instructorId } = req.body;
    if (!studentId || !instructorId)
        return res.status(404).json({ message: 'Please Fill All Fields' });
    const student = yield student_model_1.StudentModel.findById(studentId);
    if (!student)
        return res.status(404).json({ message: 'student not found' });
    const activeHistory = yield attendance_model_1.AttendanceModel.find({
        studentId: student._id,
        instructorId: instructorId,
    }).sort({ createdAt: -1 });
    return res.status(200).send({ message: "Success", student, activeHistory });
});
exports.getStudentHistory = getStudentHistory;
