import { Hono } from "hono";
import { OrderMenuItemController } from "./orderMenuItem.controller";

const orderMenuItemRouter = new Hono();

orderMenuItemRouter.get("/item", OrderMenuItemController.getAllOrderMenuItems);
orderMenuItemRouter.get("/item/:id", OrderMenuItemController.getOrderMenuItemById);
orderMenuItemRouter.post("/item", OrderMenuItemController.createMenuItem);
orderMenuItemRouter.put("/item/:id", OrderMenuItemController.updateMenuItem);
orderMenuItemRouter.delete("/item/:id", OrderMenuItemController.deleteMenuItem);




export default orderMenuItemRouter;