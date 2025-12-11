import mongoose, { Document, model, Model, Schema, Types } from 'mongoose'

export type IAttendance = {
  lectureId: Types.ObjectId
  studentId: Types.ObjectId
  instructorId: Types.ObjectId
  status: 'Present' | 'Absent' | 'Late'
  date: Date
} & Document

const attendanceSchema = new Schema<IAttendance>(
  {
    lectureId: { type: Schema.Types.ObjectId, ref: 'Lecture', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    instructorId: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true },
    status: {
      type: String,
      enum: ['Present', 'Absent', 'Late'],
      required: true,
      default: 'Absent',
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    autoCreate: true,
  },
)

attendanceSchema.index({ lectureId: 1, studentId: 1, date: 1 }, { unique: true })

export const AttendanceModel: Model<IAttendance> =
  mongoose.models.Attendance || model<IAttendance>('Attendance', attendanceSchema)
