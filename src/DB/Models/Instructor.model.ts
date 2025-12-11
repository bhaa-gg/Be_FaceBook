import mongoose, { Document, model, Model, Schema } from 'mongoose'

export type IInstructor = {
  fullName: string
  email: string
  authOtp?: string
} & Document

const instructorSchema = new Schema<IInstructor>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    authOtp: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  },
)

export const InstructorModel: Model<IInstructor> =
  mongoose.models.Instructor || model<IInstructor>('Instructor', instructorSchema)
