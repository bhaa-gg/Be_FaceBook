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
exports.getSections = exports.getSection = exports.addStudentToSection = void 0;
const student_model_1 = require("../../../DB/Models/student.model");
const section_model_1 = require("../../../DB/Models/section.model");
const attendance_model_1 = require("../../../DB/Models/attendance.model");
const constants_utils_1 = require("../../../Utils/constants.utils");
console.log();
const addStudentToSection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { sectionId } = req.body;
    const students = yield student_model_1.StudentModel.find({ sectionId }).select('_id');
    if (!students)
        return res.status(404).json({ message: 'no student found in this section' });
    const ids = students.map((student) => student._id);
    const toSection = yield section_model_1.SectionModel.findOneAndUpdate({ _id: sectionId }, { students: ids }, { new: true });
    if (!toSection)
        return res.status(404).json({ message: 'section not found' });
    return res.status(200).json({
        message: 'section updated successfully',
        section: toSection,
    });
});
exports.addStudentToSection = addStudentToSection;
const getSection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { sectionId, instructorId } = req.body;
    const section = yield section_model_1.SectionModel.findOne({ _id: sectionId }).populate('students');
    if (!section)
        return res.status(404).json({ message: 'section not found' });
    const studentsWithAttendance = yield Promise.all(section.students.map((student) => __awaiter(void 0, void 0, void 0, function* () {
        const countAttend = yield attendance_model_1.AttendanceModel.countDocuments({
            studentId: student._id,
            instructorId: instructorId,
        });
        return Object.assign(Object.assign({}, student.toObject()), { countAttendPercent: (countAttend / constants_utils_1.LEC_DAYS) * 100 });
    })));
    return res.status(200).json({
        message: 'section found successfully',
        sectionId: section._id,
        sectionName: section.sectionName,
        section: studentsWithAttendance,
    });
});
exports.getSection = getSection;
const getSections = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const sections = yield section_model_1.SectionModel.find().select('-students');
    if (!sections)
        return res.status(404).json({ message: 'No Sections Found' });
    return res.status(200).json({
        message: 'section found successfully',
        sections
    });
});
exports.getSections = getSections;
