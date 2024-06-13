import { Hono } from "hono";
import { RestaurantController } from "./restaurant.controller";

const restaurantRouter = new Hono();

restaurantRouter.get("/restaurant", RestaurantController.getAllRestaurants);
restaurantRouter.get("/restaurant/:id", RestaurantController.getRestaurantById);
restaurantRouter.post("/restaurant", RestaurantController.crerateRestaurant);
restaurantRouter.put("/restaurant/:id", RestaurantController.updateRestaurant);
restaurantRouter.delete("/restaurant/:id", RestaurantController.deleteRestaurant);




export default restaurantRouter;