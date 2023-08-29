import mongoose from 'mongoose'
import { ObjectId } from 'bson'

// 1. Create an interface representing a document in MongoDB.
export interface IOption {
  _id: ObjectId;
	icon: string;
	text: string;
}

export default IOption