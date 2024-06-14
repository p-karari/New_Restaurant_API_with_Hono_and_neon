import { Context } from "hono";
import { RestaurantOwnerService } from "./restaurant.owner.services"

const restaurantOwnerService = new RestaurantOwnerService();

export class RestaurantOwnerController{
    static async getAllRestaurantOwners(c: Context) {
        const owners = await restaurantOwnerService.getAllRestaurants();
        return c.json(owners, 200)
    }
    static async getRestaurantOwnerById(c: Context) {
        const id = Number(c.req.param("id"));
        const owner = await restaurantOwnerService.getRestaurantOwnerById(id);
        if (owner) {
            return c.json(owner, 200);
          } else {
            return c.json({ message: "User not found" }, 404);
          }
        
    }
    static async createOwner(c: Context) {
        const owner = await c.req.json();
        if(!owner) {
            return c.text("invalid resquest", 400);
        } else {
            const newOwner = await restaurantOwnerService.createRestaurantOwner(owner)
            return c.json(newOwner, 201)
        }
    }
    
  static async updateOwner(c: Context) {
    const id = Number( c.req.param("id"));
    const ownerData = await c.req.json();
    const updatedOwner = await restaurantOwnerService.updateRestaurantOwner(id, ownerData);
    if (updatedOwner) {
      return c.json(updatedOwner, 200);
    } else {
      return c.text("User not found", 404);
    }
  }

  static async deleteOwner(c: Context) {
    const id = Number( c.req.param("id"));
    try {
        await restaurantOwnerService.deleteRestaurantOwner(id);
        return c.text("Owner deleted successfully", 200)
    } catch (error) {
        console.error("Error deleting owner: ", error);
        return  c.text("Failed to delete owner", 500);
    }
  }
}