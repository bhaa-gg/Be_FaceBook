import { NextFunction, Request, Response } from 'express'
import { SendEmail } from '../../../Services/email.services'
import { InstructorModel } from '../../../DB/Models/Instructor.model'

export const SendCode = async (req: Request, res: Response, next: NextFunction) => {
  const { instructorId } = req.body

  const instructor = await InstructorModel.findById(instructorId)
  if (!instructor) return res.status(404).json({ message: 'instructor not found' })

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString()

  instructor.authOtp = otpCode

  const send: any = await SendEmail({
    code: otpCode,
    to: instructor.email,
  })

  return res.status(500).json({ send })

  if (send?.error)
    return res.status(500).json({ message: 'Something went wrong', error: send.error })

  // await instructor.save()
  return res.status(200).json({ message: 'code sent successfully' })
}

export const VerifyCode = async (req: Request, res: Response, next: NextFunction) => {
  const { instructorId, code } = req.body

  if (!code || !instructorId) return res.status(404).json({ message: 'Please Fill All Fields' })
  const instructor = await InstructorModel.findOneAndUpdate(
    { _id: instructorId, authOtp: code },
    {
      $unset: { authOtp: '' },
    },
    {
      new: true,
    },
  )
  if (!instructor) return res.status(404).json({ message: 'instructor not found with this code' })

  return res.status(200).json({ message: 'code sent successfully', instructor })
}
