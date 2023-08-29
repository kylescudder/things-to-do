import mongoose from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface ICategory {
  _id: string;
	text: string;
	userId: string;
	icon: string;
	todoCount: number;
}
interface CategoryClass {
  _id: string;
  text: string;
  userId: mongoose.Types.ObjectId;
  icon: string;
  todoCount: number;
}
const categorySchema = new mongoose.Schema<CategoryClass>({
  _id: { type: String },
  text: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId },
  icon: { type: String },
  todoCount: { type: Number },
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema)

export default Category