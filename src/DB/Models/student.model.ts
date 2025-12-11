import mongoose, { Document, model, Model, Schema } from 'mongoose'

export type IStudent = {
  studentCode?: string
  fullName: string
  department?: string
  fingerId?: string
  year?: number
  sectionId?: mongoose.Schema.Types.ObjectId // ✅ reference to Section
} & Document

const studentSchema = new Schema<IStudent>(
  {
    studentCode: { type: String, unique: true },
    fullName: { type: String, required: true },
    department: { type: String },
    fingerId: { type: String },
    year: { type: Number },
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
  },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  },
)

export const StudentModel: Model<IStudent> =
  mongoose.models.Student || model<IStudent>('Student', studentSchema)
