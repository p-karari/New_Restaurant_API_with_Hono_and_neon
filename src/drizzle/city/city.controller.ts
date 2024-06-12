import { Context } from "hono";
import { CityService } from "./city.services"

const cityService = new CityService();

export class CityController{
    static async getAllCities(c: Context) {
        const city = await cityService.getAllCities();
        return c.json(city, 200)
    }
    static async getCityById(c: Context) {
        const id = Number(c.req.param("id"));
        const city = await cityService.getCityById(id);
        if (city) {
            return c.json(city, 200);
          } else {
            return c.json({ message: "User not found" }, 404);
          }
        
    }
    static async createCity(c: Context) {
        const city = await c.req.json();
        if(!city) {
            return c.text("invalid resquest", 400);
        } else {
            const newCity = await cityService.createCity(city)
            return c.json(newCity, 201)
        }
    }
    
  static async updateCity(c: Context) {
    const id = Number( c.req.param("id"));
    const cityData = await c.req.json();
    const updatedCity = await cityService.updateCity(id, cityData);
    if (updatedCity) {
      return c.json(updatedCity, 200);
    } else {
      return c.text("User not found", 404);
    }
  }

  static async deleteCity(c: Context) {
    const id = Number( c.req.param("id"));
    try {
        await cityService.deleteCity(id);
        return c.text("City deleted successfully", 200)
    } catch (error) {
        console.error("Error deleting city: ", error);
        return  c.text("Failed to delete City", 500);
    }
  }
}