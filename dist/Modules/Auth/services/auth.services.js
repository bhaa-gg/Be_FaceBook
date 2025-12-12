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
exports.VerifyCode = exports.SendCode = void 0;
const email_services_1 = require("../../../Services/email.services");
const Instructor_model_1 = require("../../../DB/Models/Instructor.model");
const SendCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { instructorId } = req.body;
    const instructor = yield Instructor_model_1.InstructorModel.findById(instructorId);
    if (!instructor)
        return res.status(404).json({ message: 'instructor not found' });
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    instructor.authOtp = otpCode;
    const send = yield (0, email_services_1.SendEmail)({
        code: otpCode,
        to: instructor.email,
        name: instructor.fullName,
    });
    if (!(send === null || send === void 0 ? void 0 : send.success))
        return res.status(500).json({ error: send });
    yield instructor.save();
    return res.status(200).json({ message: 'code sent successfully' });
});
exports.SendCode = SendCode;
const VerifyCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { instructorId, code } = req.body;
    if (!code || !instructorId)
        return res.status(404).json({ message: 'Please Fill All Fields' });
    const instructor = yield Instructor_model_1.InstructorModel.findOneAndUpdate({ _id: instructorId, authOtp: code }, {
        $unset: { authOtp: '' },
    }, {
        new: true,
    });
    if (!instructor)
        return res.status(404).json({ message: 'instructor not found with this code' });
    return res.status(200).json({ message: 'code sent successfully', instructor });
});
exports.VerifyCode = VerifyCode;
