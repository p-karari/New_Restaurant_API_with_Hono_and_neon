import { Context } from "hono";
import { CategoryService } from "./category.services"

const categoryService = new CategoryService();

export class CategoryController{
    static async getAllCategories(c: Context) {
        const category = await categoryService.getAllCategories();
        return c.json(category, 200)
    }
    static async getCategoryById(c: Context) {
        const id = Number(c.req.param("id"));
        const category = await categoryService.getCategoryById(id);
        if (category) {
            return c.json(category, 200);
          } else {
            return c.json({ message: "Category not found" }, 404);
          }
        
    }
    static async createCategory(c: Context) {
        const category = await c.req.json();
        if(!category) {
            return c.text("invalid resquest", 400);
        } else {
            const newCategory = await categoryService.createCategory(category)
            return c.json(newCategory, 201)
        }
    }
    
  static async updateCategory(c: Context) {
    const id = Number( c.req.param("id"));
    const categoryData = await c.req.json();
    const updatedCategory = await categoryService.updateCategory(id, categoryData);
    if (updatedCategory) {
      return c.json(updatedCategory, 200);
    } else {
      return c.text("Category not found", 404);
    }
  }

  static async deleteCategory(c: Context) {
    const id = Number( c.req.param("id"));
    try {
        await categoryService.deleteCategory(id);
        return c.text("Category deleted successfully", 200)
    } catch (error) {
        console.error("Error deleting category: ", error);
        return  c.text("Failed to delete category", 500);
    }
  }
}