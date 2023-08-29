import mongoose from 'mongoose'
import { ObjectId } from 'bson'

// 1. Create an interface representing a document in MongoDB.
export interface ICategory {
  _id: ObjectId;
	text: string;
	userId: ObjectId;
	icon: string;
	todoCount: number;
}

const categorySchema = new mongoose.Schema<ICategory>({
	_id: { type: mongoose.Schema.Types.ObjectId },
	text: { type: String },
	userId: { type: mongoose.Schema.Types.ObjectId },
	icon: { type: String },
	todoCount: { types: Number }
})

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema)

export default Category