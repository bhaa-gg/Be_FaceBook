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
exports.SendEmail = void 0;
const nodemailer_1 = require("nodemailer");
const SendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ code, to }) {
    const transporter = (0, nodemailer_1.createTransport)({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSKEY,
        },
    });
    try {
        const info = yield transporter.sendMail({
            from: `"Maddison Foo Koch" <${process.env.EMAIL}>`,
            to,
            subject: 'Hello ✔',
            text: 'Hello Check your code',
            html: `<h1 style="color: red" >${code}</h1>`,
        });
        return {
            success: true,
            info,
        };
    }
    catch (err) {
        return {
            success: false,
            message: 'Something went wrong',
            error: err.message,
        };
    }
});
exports.SendEmail = SendEmail;
