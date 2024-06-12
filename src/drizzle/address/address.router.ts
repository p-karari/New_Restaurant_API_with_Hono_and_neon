import { Hono } from "hono";
import { addressController } from "./address.controller";

const addressRouter = new Hono();

addressRouter.get("/address", addressController.getAllAddress);
addressRouter.get("/address/:id", addressController.getAddressById);
addressRouter.post("/address", addressController.createAddress);
addressRouter.put("/address/:id", addressController.updateAddress);
addressRouter.delete("/address/:id", addressController.deleteAddress);




export default addressRouter;