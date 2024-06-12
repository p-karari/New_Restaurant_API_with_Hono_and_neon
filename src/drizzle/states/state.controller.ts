// controller.ts
import { Context } from "hono";
import { StateService } from "./state.service";

const stateService = new StateService();

export class ServiceController {
  static async getAllStates(c: Context) {
    const states = await stateService.getAllStates();
    return c.json(states, 200);
  }

  static async getStateById(c: Context) {
    const id = Number(c.req.param("id"));
    const state = await stateService.getStateById(id);
    if (state) {
      return c.json(state, 200);
    } else {
      return c.json({ message: "User not found" }, 404);
    }
  }

  static async createState(c: Context) {
    const state = await c.req.json();
    if (!state) {
      return c.text("Invalid request", 400);
    }
    const newState = await stateService.createState(state);
    return c.json(newState, 201);
  }

  static async updateState(c: Context) {
    const id = Number(await c.req.param("id"));
    const stateData = await c.req.json();
    const updatedState = await stateService.updateState(id, stateData);
    if (updatedState) {
      return c.json(updatedState, 200);
    } else {
      return c.text("User not found", 404);
    }
  }
  static async deleteState(c: Context) {
    const id = Number(c.req.param("id"));
    try {
      await stateService.deleteState(id);
      return c.text("User deleted successfully", 200);
    } catch (error) {
      console.error("Error deleting user:", error);
      return c.text("Failed to delete user", 500);
    }
  }
 }
