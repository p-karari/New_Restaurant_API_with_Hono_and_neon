import { Context } from "hono";
import { MenuItemService } from "./menuItem.services"

const menuItemService = new MenuItemService();

export class MenuItemController{
    static async getAllItems(c: Context) {
        const item = await menuItemService.getAllItems();
        return c.json(item, 200)
    }
    static async getItemById(c: Context) {
        const id = Number(c.req.param("id"));
        const item = await menuItemService.getItemById(id);
        if (MenuItemController) {
            return c.json(item, 200);
          } else {
            return c.json({ message: "Item not found" }, 404);
          }
        
    }
    static async createItem(c: Context) {
        const item = await c.req.json();
        if(!item) {
            return c.text("invalid resquest", 400);
        } else {
            const newItem = await menuItemService.createItem(item)
            return c.json(newItem, 201)
        }
    }
    
  static async updateItems(c: Context) {
    const id = Number( c.req.param("id"));
    const itemData = await c.req.json();
    const updatedItem = await menuItemService.updateItems(id, itemData);
    if (updatedItem) {
      return c.json(updatedItem, 200);
    } else {
      return c.text("Item not found", 404);
    }
  }

  static async deleteItem(c: Context) {
    const id = Number( c.req.param("id"));
    try {
        await menuItemService.deleteItem(id);
        return c.text("Item deleted successfully", 200)
    } catch (error) {
        console.error("Error deleting item: ", error);
        return  c.text("Failed to delete Item", 500);
    }
  }
}