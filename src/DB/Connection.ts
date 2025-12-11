import mongoose from 'mongoose'

export const dbConnection = async () => {
  await mongoose
    .connect(process.env.MONGO_URL!)
    .then(() => {
      console.log('Database connected')
    })
    .catch((err) => {
      console.log('Database connection error', err)
    })
}
 