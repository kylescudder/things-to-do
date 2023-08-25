"use client"

import { toast } from "react-toastify";
import { IToDo } from "../models/todo";
import { ICategory } from "../models/category";

export const successToast = async (todoItem: IToDo) => {
	let text: string;
	if (todoItem.completed) {
		text = `🥳🎉 Completed ${todoItem.text}`;
	} else {
		text = `😥🤦‍♀️ Uncompleted ${todoItem.text}`;
	}
	toast.success(`${text}`, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
	});
};

export const deleteToast = async (category: ICategory) => {
	toast.error(`${category.text} deleted!`, {
		position: "top-right",
		autoClose: 2500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
	});
};

export const warningToast = async (message: string) => {
	toast.warning(`${message}`, {
		position: "top-right",
		autoClose: 2500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
	});
};