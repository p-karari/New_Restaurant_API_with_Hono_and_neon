import { Hono } from "hono";
import { ServiceController } from "./state.controller"

const stateRouter = new Hono();

stateRouter.get("/states", ServiceController.getAllStates);
stateRouter.get("/states/:id", ServiceController.getStateById);
stateRouter.post("/states", ServiceController.createState);
stateRouter.put("/states/:id", ServiceController.updateState);
stateRouter.delete("/states/:id", ServiceController.deleteState);


export default stateRouter;
