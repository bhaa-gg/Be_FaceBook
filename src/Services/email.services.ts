import { createTransport } from 'nodemailer'
export const SendEmail = async ({ code, to }: { code: string; to: string }) => {
  const transporter = createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSKEY,
    },
  })

  const info = await transporter.sendMail({
    from: `"Maddison Foo Koch" <${process.env.EMAIL}>`,
    to,
    subject: 'Hello ✔',
    text: 'Hello Check your code',
    html: `<h1 style="color: red" >${code}</h1>`, 
  })
  return info
}
