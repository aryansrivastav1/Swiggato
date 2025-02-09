import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
  // Check if file exists
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded." });
  }

  const { name, description, price, category } = req.body;

  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: name,
    description: description,
    price: price,
    category: category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
  }
};

// All food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { });
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { addFood, removeFood, listFood };
