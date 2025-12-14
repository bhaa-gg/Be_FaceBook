// import nodemailer from 'nodemailer'
// import { sendCodeTemp } from '../Utils/temps.utils';

// export const SendEmail = async ({ code, to, name }: { code: string; to: string; name: string }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: 'live.smtp.mailtrap.io',
//       service: 'gmail',
//       port: 587,
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSKEY,
//       },
//     })

//     const mailOptions = {
//       from: `بهاء وافى <${process.env.EMAIL}>`,
//       to,
//       subject: 'رمز التحقق الخاص بك ✔',
//       html: sendCodeTemp(code, name),
//     }

//     const info = await transporter.sendMail(mailOptions)

//     return {
//       success: true,
//       info,
//     }
//   } catch (err: any) {
//     return {
//       success: false,
//       message: 'err',
//       error: err.message,
//     }
//   }
// }

import { Resend } from 'resend'
import { sendCodeTemp } from '../Utils/temps.utils'

export const SendEmail = async ({ code, to, name }: { code: string; to: string; name: string }) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const response = await resend.emails.send({
      from: 'بهاء وافى <onboarding@resend.dev>',
      to,
      subject: 'رمز التحقق الخاص بك ✔',
      html: sendCodeTemp(code, name),
    })

    return {
      success: true,
      info: response,
    }
  } catch (err: any) {
    return {
      success: false,
      message: 'err',
      error: err.message,
    }
  }
}





/**
 */

