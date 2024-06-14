import { Hono } from "hono";
import { DriverController } from "./driver.controller";

const driverRouter = new Hono();

driverRouter.get("/driver", DriverController.getAllDrivers);
driverRouter.get("/driver/:id", DriverController.getDriverById);
driverRouter.post("/driver", DriverController.createDriver);
driverRouter.put("/driver/:id", DriverController.updateDriver);
driverRouter.delete("/driver/:id", DriverController.deleteDriver);

export default driverRouter;