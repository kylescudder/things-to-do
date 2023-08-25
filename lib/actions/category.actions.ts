"use server"
import { connectToDB } from "../mongoose";
import Category, { ICategory } from "../models/category";
import mongoose from "mongoose";

export async function getCategories(id: mongoose.Types.ObjectId) {
  try {
    connectToDB();

    return await Category.find({
      userId: id
    }).collation({ locale: 'en', strength: 1 }) // Case-insensitive collation
      .sort({ text: 1 })
  } catch (error: any) {
    throw new Error(`Failed to get categories: ${error.message}`);
  }
}
export async function addCategory(categoryData: ICategory) {
  try {
    connectToDB();

    return await Category.findOneAndUpdate({
      _id: new mongoose.Types.ObjectId(categoryData._id)
    }, {
      text: categoryData.text,
      userId: new mongoose.Types.ObjectId(categoryData.userId),
      icon: categoryData.icon
    }, { upsert: true, new: true })
  } catch (error: any) {
    throw new Error(`Failed to add categories: ${error.message}`);
  }
}
export async function deleteCategory(categoryData: ICategory) {
  try {
    connectToDB();

    return await Category.deleteOne({
      _id: new mongoose.Types.ObjectId(categoryData._id)
    })
  } catch (error: any) {
    throw new Error(`Failed to add categories: ${error.message}`);
  }
}