import { Context } from "hono";
import { DriverService } from "./driver.services"

const driverService = new DriverService();

export class DriverController{
    static async getAllDrivers(c: Context) {
        const driver = await driverService.getAllDrivers();
        return c.json(driver, 200)
    }
    static async getDriverById(c: Context) {
        const id = Number(c.req.param("id"));
        const driver = await driverService.getDriverById(id);
        if (driver) {
            return c.json(driver, 200);
          } else {
            return c.json({ message: "Driver not found" }, 404);
          }
        
    }
    static async createDriver(c: Context) {
        const driver = await c.req.json();
        if(!driver) {
            return c.text("invalid resquest", 400);
        } else {
            const newDriver = await driverService.createDriver(driver)
            return c.json(newDriver, 201)
        }
    }
    
  static async updateDriver(c: Context) {
    const id = Number( c.req.param("id"));
    const driverData = await c.req.json();
    const updatedDriver = await driverService.updateDriver(id, driverData);
    if (updatedDriver) {
      return c.json(updatedDriver, 200);
    } else {
      return c.text("Driver not found", 404);
    }
  }

  static async deleteDriver(c: Context) {
    const id = Number( c.req.param("id"));
    try {
        await driverService.deleteDriver(id);
        return c.text("City deleted successfully", 200)
    } catch (error) {
        console.error("Error deleting driver: ", error);
        return  c.text("Failed to delete Driver", 500);
    }
  }
}