import mongoose from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface IToDo {
  _id: string;
	text: string;
	targetDate: Date;
	targetDateString: string;
	completed: boolean;
	completedDate: Date;
	categoryId: string;
}

const todoSchema = new mongoose.Schema<IToDo>({
  _id: { type: String },
  text: { type: String },
  targetDate: { type: Date },
  targetDateString: { type: String },
  completed: { type: Boolean },
  completedDate: { type: Date },
  categoryId: { type: mongoose.Types.ObjectId },
});

const ToDo = mongoose.models.ToDo || mongoose.model('ToDo', todoSchema)

export default ToDo