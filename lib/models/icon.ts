import mongoose from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface IIcon {
	_id: string
	icon: string
	text: string
}
interface IconClass {
	_id: mongoose.Types.ObjectId
	icon: string
	text: string
}
const iconSchema = new mongoose.Schema<IconClass>({
	_id: { type: mongoose.Schema.Types.ObjectId },
	icon: { type: String },
	text: { type: String }
})

const Icon = mongoose.models.Icon !== null || mongoose.model('Icon', iconSchema)

export default Icon
