import { Context } from "hono";
import { OrderService } from "./order.service"

const orderService = new OrderService();

export class OrderController{
    static async getAllOrders(c: Context) {
        const order = await orderService.getAllOrders();
        return c.json(order, 200)
    }
    static async getOrderById(c: Context) {
        const id = Number(c.req.param("id"));
        const order = await orderService.getOrderById(id);
        if (order) {
            return c.json(order, 200);
          } else {
            return c.json({ message: "Order not found" }, 404);
          }
        
    }
    static async createOrder(c: Context) {
        const city = await c.req.json();
        if(!city) {
            return c.text("invalid resquest", 400);
        } else {
            const newOrder = await orderService.createOrder(city)
            return c.json(newOrder, 201)
        }
    }
    
  static async updateOrder(c: Context) {
    const id = Number( c.req.param("id"));
    const orderData = await c.req.json();
    const updatedOrder = await orderService.updateOrder(id, orderData);
    if (updatedOrder) {
      return c.json(updatedOrder, 200);
    } else {
      return c.text("User not found", 404);
    }
  }

  static async deleteOrder(c: Context) {
    const id = Number( c.req.param("id"));
    try {
        await orderService.deleteOrder(id);
        return c.text("Order deleted successfully", 200)
    } catch (error) {
        console.error("Error deleting order: ", error);
        return  c.text("Failed to delete Order", 500);
    }
  }
}