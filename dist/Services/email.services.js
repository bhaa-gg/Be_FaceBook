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
const resend_1 = require("resend");
const SendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ code, to, name }) {
    const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
    try {
        const response = yield resend.emails.send({
            from: 'بهاء وافى <onboarding@resend.dev>', // اسم المرسل بالعربي
            to,
            subject: 'رمز التحقق الخاص بك ✔', // بالعربي
            html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #333;">مرحبًا ${name} 👋</h2>
        <p style="color: #555; font-size: 16px;">لقد طلبت رمز التحقق الخاص بك. استخدم الرمز التالي لتأكيد هويتك:</p>
        <div style="margin: 20px 0; padding: 15px; background-color: #ffecec; border-radius: 8px; text-align: center; font-size: 24px; font-weight: bold; color: #d8000c;">
          ${code}
        </div>
        <p style="color: #555; font-size: 14px;">إذا لم تطلب رمز التحقق، يمكنك تجاهل هذا البريد بأمان.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #999; font-size: 12px; text-align: center;">© 2025 جميع الحقوق محفوظة لبهاء وافى</p>
      </div>
      `,
        });
        return {
            success: true,
            info: response,
        };
    }
    catch (err) {
        return {
            success: false,
            message: 'حدث خطأ ما',
            error: err.message,
        };
    }
});
exports.SendEmail = SendEmail;
