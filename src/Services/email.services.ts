import { createTransport } from 'nodemailer'
export const SendEmail = async ({ code, to }: { code: string; to: string }) => {
  const transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSKEY,
    },
  })

  try {
    const info = await transporter.sendMail({
      from: `"Maddison Foo Koch" <${process.env.EMAIL}>`,
      to,
      subject: 'Hello ✔',
      text: 'Hello Check your code',
      html: `<h1 style="color: red" >${code}</h1>`,
    })
    return {
      success: true,
      info,
    }
  } catch (err: any) {
    return {
      success: false,
      message: 'Something went wrong',
      error: err.message,
    }
  }
}
