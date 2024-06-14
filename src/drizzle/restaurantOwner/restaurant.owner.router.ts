import { Hono } from "hono";
import { RestaurantOwnerController } from "./restaurant.owner.controller";

const restaurantOwnerRouter = new Hono();

restaurantOwnerRouter.get("/rOwner", RestaurantOwnerController.getAllRestaurantOwners);
restaurantOwnerRouter.get("/rOwner/:id", RestaurantOwnerController.getRestaurantOwnerById);
restaurantOwnerRouter.post("/rOwner", RestaurantOwnerController.createOwner);
restaurantOwnerRouter.put("/rOwner/:id", RestaurantOwnerController.updateOwner);
restaurantOwnerRouter.delete("/rOwner/:id", RestaurantOwnerController.deleteOwner);


export default restaurantOwnerRouter;