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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const temps_utils_1 = require("../utils/temps.utils.js");
const SendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ code, to, name }) {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: 'live.smtp.mailtrap.io',
            service: 'gmail',
            port: 587,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSKEY,
            },
        });
        const mailOptions = {
            from: `بهاء وافى <${process.env.EMAIL}>`,
            to,
            subject: 'رمز التحقق الخاص بك ✔',
            html: (0, temps_utils_1.sendCodeTemp)(code, name),
        };
        const info = yield transporter.sendMail(mailOptions);
        return {
            success: true,
            info,
        };
    }
    catch (err) {
        return {
            success: false,
            message: 'err',
            error: err.message,
        };
    }
});
exports.SendEmail = SendEmail;
