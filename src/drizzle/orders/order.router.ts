import { Hono } from "hono";
import { OrderController } from "./order.controller";

const orderRouter = new Hono();

orderRouter.get("/order", OrderController.getAllOrders);
orderRouter.get("/order/:id", OrderController.getOrderById);
orderRouter.post("/order", OrderController.createOrder);
orderRouter.put("/order/:id", OrderController.updateOrder);
orderRouter.delete("/order/:id", OrderController.deleteOrder);




export default orderRouter;