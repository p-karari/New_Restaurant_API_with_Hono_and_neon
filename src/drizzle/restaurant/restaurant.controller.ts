import { Context } from "hono";
import { RestaurantService } from "./restaurant.services"

const restaurantService = new RestaurantService();

export class RestaurantController{
    static async getAllRestaurants(c: Context) {
        const restaurant = await restaurantService.getAllRestaurants();
        return c.json(restaurant, 200)
    }
    static async getRestaurantById(c: Context) {
        const id = Number(c.req.param("id"));
        const restaurant = await restaurantService.getRestaurantById(id);
        if (restaurant) {
            return c.json(restaurant, 200);
          } else {
            return c.json({ message: "Restaurant not found" }, 404);
          }
        
    }
    static async crerateRestaurant(c: Context) {
        const restaurant = await c.req.json();
        if(!restaurant) {
            return c.text("invalid resquest", 400);
        } else {
            const newRestaurant = await restaurantService.createRestaurant(restaurant)
            return c.json(newRestaurant, 201)
        }
    }
    
  static async updateRestaurant(c: Context) {
    const id = Number( c.req.param("id"));
    const restaurantData = await c.req.json();
    const updatedRestaurant = await restaurantService.updateRestaurant(id, restaurantData);
    if (updatedRestaurant) {
      return c.json(updatedRestaurant, 200);
    } else {
      return c.text("restaurant not found", 404);
    }
  }

  static async deleteRestaurant(c: Context) {
    const id = Number( c.req.param("id"));
    try {
        await restaurantService.deleteRestaurant(id);
        return c.text("Restaurant deleted successfully", 200)
    } catch (error) {
        console.error("Error deleting Restaurant: ", error);
        return  c.text("Failed to delete Restaurant", 500);
    }
  }
}