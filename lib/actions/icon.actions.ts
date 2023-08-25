"use server"
import { connectToDB } from "../mongoose";
import Icon from "../models/icon";

export async function getIcons() {
  try {
    connectToDB();

    return await Icon.find()
    .collation({ locale: 'en', strength: 1 }) // Case-insensitive collation
      .sort({ text: 1 })
  } catch (error: any) {
    throw new Error(`Failed to get categories: ${error.message}`);
  }
}