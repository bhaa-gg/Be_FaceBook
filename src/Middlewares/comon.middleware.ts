import { NextFunction, Request, Response } from 'express'

export const errCatcher = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => {
      return res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
      })
    })
  }
}
