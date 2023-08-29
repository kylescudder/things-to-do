import mongoose from 'mongoose'
import { ObjectId } from 'bson'

// 1. Create an interface representing a document in MongoDB.
export interface IIcon {
  _id: ObjectId;
	icon: string;
	text: string;
}

const iconSchema = new mongoose.Schema<IIcon>({
	_id: { type: mongoose.Schema.Types.ObjectId },
	icon: { type: String },
	text: { type: String }
})

const Icon = mongoose.models.Icon || mongoose.model('Icon', iconSchema)

export default Icon