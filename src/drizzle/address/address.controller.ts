import { Context } from "hono";
import { AddressService } from "./address.services"

const addressService = new AddressService();

export class addressController{
    static async getAllAddress(c: Context) {
        const address = await addressService.getAllAddress();
        return c.json(address, 200)
    }
    static async getAddressById(c: Context) {
        const id = Number(c.req.param("id"));
        const address = await addressService.getAddressById(id);
        if (address) {
            return c.json(address, 200);
          } else {
            return c.json({ message: "Address not found" }, 404);
          }
        
    }
    static async createAddress(c: Context) {
        const address = await c.req.json();
        if(!address) {
            return c.text("invalid resquest", 400);
        } else {
            const newAddress = await addressService.createAddress(address)
            return c.json(newAddress, 201)
        }
    }
    
  static async updateAddress(c: Context) {
    const id = Number( c.req.param("id"));
    const cityData = await c.req.json();
    const updatedAddress = await addressService.updateAddress(id, cityData);
    if (updatedAddress) {
      return c.json(updatedAddress, 200);
    } else {
      return c.text("Address not found", 404);
    }
  }

  static async deleteAddress(c: Context) {
    const id = Number( c.req.param("id"));
    try {
        await addressService.deleteAddress(id);
        return c.text("Address deleted successfully", 200)
    } catch (error) {
        console.error("Error deleting address: ", error);
        return  c.text("Failed to delete address", 500);
    }
  }
}