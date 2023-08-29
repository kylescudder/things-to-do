import mongoose from 'mongoose'
import { ObjectId } from 'bson'

// 1. Create an interface representing a document in MongoDB.
export interface IToDo {
  _id: ObjectId;
	text: string;
	targetDate: Date;
	targetDateString: string;
	completed: boolean;
	completedDate: Date;
	categoryId: ObjectId;
}

const todoSchema = new mongoose.Schema<IToDo>({
	_id: { type: mongoose.Schema.Types.ObjectId },
	text: { type: String },
	targetDate: { type: Date },
	targetDateString: { type: String },
	completed: { type: Boolean },
	completedDate: { type: Date },
	categoryId: { type: mongoose.Schema.Types.ObjectId },
})

const ToDo = mongoose.models.ToDo || mongoose.model('ToDo', todoSchema)

export default ToDo