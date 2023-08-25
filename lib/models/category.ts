import mongoose from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface ICategory {
  _id: mongoose.Types.ObjectId;
	text: string;
	userId: mongoose.Types.ObjectId;
	icon: string;
}

const categorySchema = new mongoose.Schema<ICategory>({
	_id: { type: mongoose.Schema.Types.ObjectId },
	text: { type: String },
	userId: { type: mongoose.Schema.Types.ObjectId },
	icon: { type: String }
})

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema)

export default Category