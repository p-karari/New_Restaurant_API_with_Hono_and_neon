import { Hono } from "hono";
import { CityController } from "./city.controller";

const cityRouter = new Hono();

cityRouter.get("/city", CityController.getAllCities);
cityRouter.get("/city/:id", CityController.getCityById);
cityRouter.post("/city", CityController.createCity);
cityRouter.put("/city/:id", CityController.updateCity);
cityRouter.delete("/city/:id", CityController.deleteCity);

export default cityRouter;