import mongoose from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface IToDo {
  _id: string
  text: string
  targetDate: Date
  targetDateString: string
  completed: boolean
  completedDate: Date
  categoryId: string
}
interface ToDoClass {
  _id: mongoose.Types.ObjectId
  text: string
  targetDate: Date
  targetDateString: string
  completed: boolean
  completedDate: Date
  categoryId: mongoose.Types.ObjectId
}
const todoSchema = new mongoose.Schema<ToDoClass>({
  _id: { type: mongoose.Schema.Types.ObjectId },
  text: { type: String },
  targetDate: { type: Date },
  targetDateString: { type: String },
  completed: { type: Boolean },
  completedDate: { type: Date },
  categoryId: { type: mongoose.Schema.Types.ObjectId }
})

const ToDo = mongoose.models.ToDo || mongoose.model('ToDo', todoSchema)

export default ToDo
