import { Hono } from "hono";
import { DriverController } from "./driver.controller";

const driverRouter = new Hono();

driverRouter.get("/city", DriverController.getAllDrivers);
driverRouter.get("/city/:id", DriverController.getDriverById);
driverRouter.post("/city", DriverController.createDriver);
driverRouter.put("/city/:id", DriverController.updateDriver);
driverRouter.delete("/city/:id", DriverController.deleteDriver);

export default driverRouter;