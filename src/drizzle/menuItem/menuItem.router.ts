import { Hono } from "hono";
import { MenuItemController } from "./menuItem.controller";

const menuItemRouter = new Hono();

menuItemRouter.get("/menu/item", MenuItemController.getAllItems);
menuItemRouter.get("/menu/item/:id", MenuItemController.getItemById);
menuItemRouter.post("/menu/item", MenuItemController.createItem);
menuItemRouter.put("/menu/item/:id", MenuItemController.updateItems);
menuItemRouter.delete("/menu/item/:id", MenuItemController.deleteItem);




export default menuItemRouter;