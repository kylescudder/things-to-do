'use server'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import mongoose from 'mongoose'
import ToDo, { type IToDo } from '../models/todo'
import { connectToDB } from '../mongoose'
import Category, { type ICategory } from '../models/category'

dayjs.extend(utc)

export async function getToDos (id: string): Promise<IToDo[] | null> {
	try {
		await connectToDB()

		const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000) // Calculate the date 1 hour ago
		const todos: IToDo[] = await ToDo.find({
			categoryId: new mongoose.Types.ObjectId(id),
			$or: [
				{ completed: true, completedDate: { $gte: oneHourAgo } },
				{ completed: false }
			]
		})
			.sort({
				completed: 1,
				targetDate: 1
			})
			.lean()

		if (todos !== undefined) {
			todos.forEach((todo) => {
				if (todo.targetDate) {
					todo.targetDateString = dayjs(todo.targetDate).format(
						'DD/MM/YYYY HH:mm'
					)
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
export async function getOverdueToDos (id: string): Promise<IToDo[] | null> {
	try {
		await connectToDB()

		const now = Date.now() // Calculate the date 1 hour ago
		const categories: ICategory[] = await Category.find({}).lean()
		const todos: IToDo[] = await ToDo.find({
			userId: new mongoose.Types.ObjectId(id),
			completed: false,
			targetDate: { $lte: now }
		})
			.sort({
				categoryId: 1,
				targetDate: 1
			})
			.lean()

		if (todos !== undefined) {
			todos.forEach((todo) => {
				if (todo.targetDate) {
					todo.targetDateString = dayjs(todo.targetDate).format(
						'DD/MM/YYYY HH:mm'
					)
				} else {
					todo.targetDateString = ''
				}

				todo.category = categories.find(
					(category) => category._id.toString() === todo.categoryId.toString()
				)?.text ?? ''
			})
		}

		return todos
	} catch (error: any) {
		throw new Error(`Failed to get overdue todos: ${error.message}`)
	}
}
export const clickToDo = async (todoItem: IToDo): Promise<void> => {
	try {
		await connectToDB()
		todoItem.completedDate = new Date()
		await ToDo.updateOne(
			{
				_id: todoItem._id
			},
			{
				completed: todoItem.completed,
				completedDate: `${todoItem.completedDate
					.toISOString()
					.substring(
						0,
						todoItem.completedDate.toISOString().length - 1
					)}+00:00`
			}
		).lean()
	} catch (error: any) {
		throw new Error(`Failed to click todo: ${error.message}`)
	}
}
export const addToDo = async (todoItem: IToDo): Promise<IToDo | null> => {
	try {
		await connectToDB()

		const newId = new mongoose.Types.ObjectId()
		if (todoItem._id === '') {
			todoItem._id = newId.toString()
		}

		const todo: IToDo = await ToDo.findOneAndUpdate(
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

		return todo
	} catch (error: any) {
		throw new Error(`Failed to add todo: ${error.message}`)
	}
}
