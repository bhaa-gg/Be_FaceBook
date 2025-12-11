import mongoose, { Document, model, Model, Schema, Types } from 'mongoose'

export type ILecture = {
  sectionId: Types.ObjectId
  instructorId: Types.ObjectId
  subjectName: string
  lectureTime: {
    day: string
    from: string // e.g. "10:00 AM"
    to: string // e.g. "12:00 PM"
  }
} & Document

const lectureSchema = new Schema<ILecture>(
  {
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section', required: true },
    instructorId: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true },
    subjectName: { type: String, required: true },
    lectureTime: {
      day: { type: String, required: true },
      from: { type: String, required: true },
      to: { type: String, required: true },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  },
)

export const LectureModel: Model<ILecture> =
  mongoose.models.Lecture || model<ILecture>('Lecture', lectureSchema)
