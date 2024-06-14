// controller.ts
import { Context } from "hono";
import { UserService } from "./user.service";

const userService = new UserService();

export class UserController {
  static async getAllUsers(c: Context) {
    const users = await userService.getAllUsers();
    return c.json(users);
  }

  static async getUserById(c: Context) {
    const id = Number(c.req.param("id"));
    const user = await userService.getUserById(id);
    if (user) {
      return c.json(user, 200);
    } else {
      return c.json({ message: "User not found" }, 404);
    }
  }

  static async createUser(c: Context) {
    const user = await c.req.json();
    if (!user) {
      return c.text("Invalid request", 400);
    }
    const newUser = await userService.createUser(user);
    return c.json(newUser, 201);
  }

  static async updateUser(c: Context) {
    const id = Number(c.req.param("id"));
    const userData = await c.req.json();
    const updatedUser = await userService.updateUser(id, userData);
    if (updatedUser) {
      return c.json(updatedUser, 200);
    } else {
      return c.text("User not found", 404);
    }
  }
 
  static async deleteUser(c: Context) {
    const id = Number(c.req.param("id"));
    try {
      await userService.deleteUser(id);
      return c.text("User deleted successfully", 200);
    } catch (error) {
      console.error("Error deleting user:", error);
      return c.text("Failed to delete user", 500);
    }
  }
}
