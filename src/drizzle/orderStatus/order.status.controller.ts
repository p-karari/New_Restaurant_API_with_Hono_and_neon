import { Context } from "hono";
import { StatusService } from "./order.status.service"

const statusService = new StatusService();

export class StatusController{
    static async getAllStatus(c: Context) {
        const status = await statusService.getAllStatus();
        return c.json(status, 200)
    }
    static async getStatusById(c: Context) {
        const id = Number(c.req.param("id"));
        const status = await statusService.getStatusById(id);
        if (status) {
            return c.json(status, 200);
          } else {
            return c.json({ message: "User not found" }, 404);
          }
        
    }
    static async createStatus(c: Context) {
        const status = await c.req.json();
        if(!status) {
            return c.text("invalid resquest", 400);
        } else {
            const newStatus = await statusService.createStatus(status)
            return c.json(newStatus, 201)
        }
    }
    
  static async updateStatus(c: Context) {
    const id = Number( c.req.param("id"));
    const statusData = await c.req.json();
    const updatedStatus = await statusService.updateStatus(id, statusData);
    if (updatedStatus) {
      return c.json(updatedStatus, 200);
    } else {
      return c.text("Order Status not found", 404);
    }
  }

  static async deleteStatus(c: Context) {
    const id = Number( c.req.param("id"));
    try {
        await statusService.deleteStatus(id);
        return c.text("Order Status deleted successfully", 200)
    } catch (error) {
        console.error("Error deleting order status: ", error);
        return  c.text("Failed to delete order status", 500);
    }
  }
}