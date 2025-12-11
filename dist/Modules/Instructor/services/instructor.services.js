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
exports.getInstructors = void 0;
const Instructor_model_1 = require("../../../DB/Models/Instructor.model");
const getInstructors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const instructors = yield Instructor_model_1.InstructorModel.find();
    if (!instructors)
        return res.status(404).json({ message: 'No Instructors Now' });
    return res.status(200).json({
        message: 'instructors found successfully',
        instructors,
    });
});
exports.getInstructors = getInstructors;
