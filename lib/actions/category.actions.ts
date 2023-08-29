"use server";
import { connectToDB } from "../mongoose";
import Category, { ICategory } from "../models/category";
import ToDo from "../models/todo";
import { ObjectId } from "bson";
import mongoose from "mongoose";

export async function getCategories(id: string) {
  try {
    connectToDB();
    const categories: ICategory[] = await Category.find({
      userId: new mongoose.Types.ObjectId(id),
    })
      .collation({ locale: "en", strength: 1 }) // Case-insensitive collation
      .sort({ text: 1 });
    const newCatList: ICategory[] = [];

    for (const category of categories) {
      if (category._id != null) {
        const count = await getCategoryCount(category._id);

        const categoryWithCount: ICategory = {
          _id: category._id, // Add other properties as needed
          text: category.text,
          userId: category.userId,
          icon: category.icon,
          todoCount: count,
        };
        newCatList.push(categoryWithCount);
      }
    }

    return newCatList;
  } catch (error: any) {
    throw new Error(`Failed to get categories: ${error.message}`);
  }
}
export async function getCategoryCount(id: string) {
  try {
    connectToDB();
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // Calculate the date 1 hour ago
    return await ToDo.find({
      categoryId: new mongoose.Types.ObjectId(id),
      $or: [
        { completed: true, completedDate: { $gte: oneHourAgo } },
        { completed: false },
      ],
    }).count();
  } catch (error: any) {
    throw new Error(`Failed to get category count: ${error.message}`);
  }
}
export async function addCategory(categoryData: ICategory) {
  try {
    connectToDB();

    return await Category.findOneAndUpdate(
      {
        _id: new ObjectId(categoryData._id),
      },
      {
        text: categoryData.text,
        userId: new ObjectId(categoryData.userId),
        icon: categoryData.icon,
      },
      { upsert: true, new: true }
    );
  } catch (error: any) {
    throw new Error(`Failed to add categories: ${error.message}`);
  }
}
export async function deleteCategory(categoryData: ICategory) {
  try {
    connectToDB();

    return await Category.deleteOne({
      _id: new ObjectId(categoryData._id),
    });
  } catch (error: any) {
    throw new Error(`Failed to add categories: ${error.message}`);
  }
}
