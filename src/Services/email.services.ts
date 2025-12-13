
import nodemailer from 'nodemailer'
import { sendCodeTemp } from '../Utils/temps.utils'

export const SendEmail = async ({ code, to, name }: { code: string; to: string; name: string }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'live.smtp.mailtrap.io',
      service: 'gmail',
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSKEY,
      },
    })

    const mailOptions = {
      from: `بهاء وافى <${process.env.EMAIL}>`,
      to,
      subject: 'رمز التحقق الخاص بك ✔',
      html: sendCodeTemp(code, name),
    }

    const info = await transporter.sendMail(mailOptions)

    return {
      success: true,
      info,
    }
  } catch (err: any) {
    return {
      success: false,
      message: 'err',
      error: err.message,
    }
  }
}
