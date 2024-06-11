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
    const user = userService.getUserById(id);
    if (user) {
      return c.json(user, 200);
    } else {
      return c.json({ message: "User  found" }, 404);
    }
  }

  static async createUser(c: Context) {
    const user = await c.req.json();
    if (!user) {
      return c.text("Invalid request", 400);
    }
    const newUser = userService.createUser(user);
    return c.json(newUser, 201);
  }

  static async updateUser(c: Context) {
    const id = Number(await c.req.param("id"));
    const userData = await c.req.json();
    const updatedUser = userService.updateUser(id, userData);
    if (updatedUser) {
      return c.json(updatedUser, 200);
    } else {
      return c.text("User not found", 404);
    }
  }
}
