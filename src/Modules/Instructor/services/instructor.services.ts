import { NextFunction, Request, Response } from 'express'
import { InstructorModel } from '../../../DB/Models/Instructor.model'

export const getInstructors = async (req: Request, res: Response, next: NextFunction) => {
  const instructors = await InstructorModel.find()
  if (!instructors) return res.status(404).json({ message: 'No Instructors Now' })

  return res.status(200).json({
    message: 'instructors found successfully',
    instructors,
  })
}
