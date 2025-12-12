// import { Resend } from 'resend'

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
import { Resend } from 'resend'

export const SendEmail = async ({ code, to }: { code: string; to: string }) => {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const response = await resend.emails.send({
      from: 'Bahaa Wafy <onboarding@resend.dev>',
      to,
      subject: 'Hello ✔',
      html: `<h1 style="color: red">${code}</h1>`,
    })

    return {
      success: true,
      info: response,
    }
  } catch (err: any) {
    return {
      success: false,
      message: 'Something went wrong',
      error: err.message,
    }
  }
}
