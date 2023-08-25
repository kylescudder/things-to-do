import mongoose from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface IOption {
  _id: mongoose.Types.ObjectId;
	icon: string;
	text: string;
}

export default IOption