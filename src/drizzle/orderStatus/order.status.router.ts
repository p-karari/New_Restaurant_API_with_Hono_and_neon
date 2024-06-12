import { Hono } from "hono";
import { StatusController } from "./order.status.controller";

const statusRouter = new Hono();

statusRouter.get("/status", StatusController.getAllStatus);
statusRouter.get("/status/:id", StatusController.getStatusById);
statusRouter.post("/status", StatusController.createStatus);
statusRouter.put("/status/:id", StatusController.updateStatus);
statusRouter.delete("/status/:id", StatusController.deleteStatus);

export default statusRouter;