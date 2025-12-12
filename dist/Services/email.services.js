"use strict";
// import { Resend } from 'resend'
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
// const resend = new Resend(process.env.RESEND_API_KEY)
// export const SendEmail = async ({ code, to }: { code: string; to: string }) => {
//   try {
//     const response = await resend.emails.send({
//       from: 'yourname@resend.dev', // غيّرها للإيميل المسموح من Resend
//       to,
//       subject: 'Hello ✔',
//       html: `<h1 style="color: red">${code}</h1>`,
//     })
//     return {
//       success: true,
//       info: response,
//     }
//   } catch (err: any) {
//     return {
//       success: false,
//       message: 'Something went wrong',
//       error: err.message,
//     }
//   }
// }
const resend_1 = require("resend");
const SendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ code, to }) {
    const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
    try {
        const response = yield resend.emails.send({
            from: 'Bahaa Wafy <onboarding@resend.dev>',
            to,
            subject: 'Hello ✔',
            html: `<h1 style="color: red">${code}</h1>`,
        });
        return {
            success: true,
            info: response,
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
