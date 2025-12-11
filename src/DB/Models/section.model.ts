import mongoose, { Document, model, Model, Schema } from 'mongoose'

export type ISection = {
  sectionName: string
  students: mongoose.Types.ObjectId[] 
} & Document

const sectionSchema = new Schema<ISection>(
  {
    sectionName: { type: String, required: true, unique: true },
    students: [{ type: mongoose.Types.ObjectId, ref: 'Student' }],
  },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  },
)

export const SectionModel: Model<ISection> =
  mongoose.models.Section || model<ISection>('Section', sectionSchema)
