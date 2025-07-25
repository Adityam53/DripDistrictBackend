const { initializeDatabase } = require("./db/db.connect");
require("dotenv").config();
const Clothing = require("./models/clothing.models");
const Category = require("./models/category.models");
const clothes = require("./clothes.json");
const express = require("express");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

initializeDatabase();

const seedData = async () => {
  try {
    const categories = await Category.find({});
    console.log(categories);

    const categoryMap = {};
    categories.forEach((category) => {
      categoryMap[category.name] = category._id;
    });

    const clothingItemsWithId = clothes.map((cloth) => ({
      ...cloth,
      category: categoryMap[cloth.category],
    }));

    await Clothing.insertMany(clothingItemsWithId);
    console.log("clothing data seeded successfully", clothingItemsWithId);
  } catch (error) {
    console.error("Error in seeding clothing data", error);
  }
};
// seedClothingData();

const seedCategoriesData = async () => {
  try {
    const categories = [{ name: "Men" }, { name: "Women" }, { name: "Kids" }];

    const result = await Category.insertMany(categories);
    console.log("Categories seeded", result);
  } catch (error) {
    console.error("Error seeding categories", error);
  }
};

// seedCategoriesData()

const getAllClothes = async () => {
  try {
    const allClothes = await Clothing.find().populate("category");
    return allClothes;
  } catch (error) {
    throw error;
  }
};

app.get("/clothes", async (req, res) => {
  try {
    const allClothes = await getAllClothes();
    if (allClothes.length > 0) {
      res.json(allClothes);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    res.status(500).json({ error: "An error occured while fetching items" });
  }
});

const getClothesById = async (clothId) => {
  try {
    const clothById = await Clothing.findById(clothId).populate("category");
    return clothById;
  } catch (error) {
    throw error;
  }
};

app.get("/clothes/:id", async (req, res) => {
  try {
    const clothById = await getClothesById(req.params.id);
    if (clothById) {
      res.json(clothById);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error("Failed to fetch item", error);
    res
      .status(500)
      .json({ error: "An error occured while fetching item by ID" });
  }
});

const readClothesByCategory = async (clothCategory) => {
  try {
    const category = await Category.findOne({ name: clothCategory });
    if (!category) {
      console.log("No category found");
      return [];
    }
    const clothes = await Clothing.find({ category: category._id }).populate(
      "category"
    );
    return clothes;
  } catch (error) {
    throw error;
  }
};

app.get("/clothes/category/:categoryname", async (req, res) => {
  try {
    const clothesByCategory = await readClothesByCategory(
      req.params.categoryname
    );
    if (clothesByCategory.length > 0) {
      res.json(clothesByCategory);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
    res
      .status(500)
      .json({ error: "An error occured while fetching clothes by category" });
  }
});
const readAllCategories = async () => {
  try {
    const allCategories = await Category.find({});
    return allCategories;
  } catch (error) {
    throw error;
  }
};

app.get("/categories", async (req, res) => {
  try {
    const allCategories = await readAllCategories();
    if (allCategories.length > 0) {
      res.json(allCategories);
    } else {
      res.status(404).json({ error: "Categories not found" });
    }
  } catch (error) {
    console.error("An error occured while fetching categories");
    res.status(500).json({ error: "Failed to fetch cetagories" });
  }
});

const readCategoriesByID = async (categoryId) => {
  try {
    const categoryById = await Category.findById(categoryId);
    return categoryById;
  } catch (error) {
    throw error;
  }
};

app.get("/categories/:id", async (req, res) => {
  try {
    const categoryById = await readCategoriesByID(req.params.id);
    if (categoryById) {
      res.json(categoryById);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error("An error occured while fetching categories by ID");
    res.status(500).json({ error: "Failed to fetch categories by Id." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
