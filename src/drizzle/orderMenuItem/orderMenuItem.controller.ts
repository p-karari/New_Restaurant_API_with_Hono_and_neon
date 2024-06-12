import { Context } from "hono";
import { OrderService } from "./orderMenuItem.service"

const onrderMenuItemService = new OrderService();

export class OrderMenuItemController{
    static async getAllOrderMenuItems(c: Context) {
        const orderMenuItem = await onrderMenuItemService.getAllOrderMenuItems();
        return c.json(orderMenuItem, 200)
    }
    static async getOrderMenuItemById(c: Context) {
        const id = Number(c.req.param("id"));
        const menuItem = await onrderMenuItemService.getOrderMenuItemById(id);
        if (menuItem) {
            return c.json(menuItem, 200);
          } else {
            return c.json({ message: "Menu Item not found" }, 404);
          }
        
    }
    static async createMenuItem(c: Context) {
        const menuItem = await c.req.json();
        if(!menuItem) {
            return c.text("invalid resquest", 400);
        } else {
            const newMenuItem = await onrderMenuItemService.createMenuItem(menuItem)
            return c.json(newMenuItem, 201)
        }
    }
    
  static async updateMenuItem(c: Context) {
    const id = Number( c.req.param("id"));
    const menuItemData = await c.req.json();
    const updatedMenuItem = await onrderMenuItemService.updateMenuItem(id, menuItemData);
    if (updatedMenuItem) {
      return c.json(updatedMenuItem, 200);
    } else {
      return c.text("Menu Item not found", 404);
    }
  }

  static async deleteMenuItem(c: Context) {
    const id = Number( c.req.param("id"));
    try {
        await onrderMenuItemService.deleteMenuItem(id);
        return c.text("Menu Item deleted successfully", 200)
    } catch (error) {
        console.error("Error deleting Menu Item: ", error);
        return  c.text("Failed to delete Menu Item", 500);
    }
  }
}