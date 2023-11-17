'use server'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import mongoose from 'mongoose'
import ToDo, { IToDo } from '../models/todo'
import { connectToDB } from '../mongoose'

dayjs.extend(utc)

export async function getToDos(id: string) {
	try {
		connectToDB()

		const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000) // Calculate the date 1 hour ago
		const todos: IToDo[] = await ToDo.find({
			categoryId: new mongoose.Types.ObjectId(id),
			$or: [
				{ completed: true, completedDate: { $gte: oneHourAgo } },
				{ completed: false }
			]
		}).sort({
			completed: 1,
			targetDate: 1
		}).lean()

		if (todos !== undefined) {
			todos.forEach((todo) => {
				if (todo.targetDate) {
					todo.targetDateString = dayjs(todo.targetDate).format('DD/MM/YYYY HH:mm')
				} else {
					todo.targetDateString = ''
				}
			})
		}

		return todos
	} catch (error: any) {
		throw new Error(`Failed to get todos: ${error.message}`)
	}
}
export const clickToDo = async (todoItem: IToDo) => {
	try {
		connectToDB()
		todoItem.completedDate = new Date()
		await ToDo.updateOne({
			_id: todoItem._id
		}, {
			completed: todoItem.completed,
			completedDate: `${todoItem.completedDate.toISOString().substring(0, todoItem.completedDate.toISOString().length - 1)}+00:00`
		}).lean()
	} catch (error: any) {
		throw new Error(`Failed to get todos: ${error.message}`)
	}
}
export const addToDo = async (todoItem: IToDo) => {
	try {
		connectToDB()

    const newId = new mongoose.Types.ObjectId()
    if (todoItem._id === '') {
			todoItem._id = newId.toString()
    }

		return await ToDo.findOneAndUpdate(
			{
				_id: new mongoose.Types.ObjectId(todoItem._id)
      },
			{
				_id: new mongoose.Types.ObjectId(todoItem._id),
				text: todoItem.text,
				targetDate: todoItem.targetDate,
				categoryId: new mongoose.Types.ObjectId(todoItem.categoryId),
				completed: false
			},
			{ upsert: true, new: true }
		)
	} catch (error: any) {
		throw new Error(`Failed to get todos: ${error.message}`)
	}
}
