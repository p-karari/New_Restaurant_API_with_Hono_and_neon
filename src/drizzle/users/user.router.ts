
import { Hono } from "hono";
import { UserController } from "./user.controller";
import { userRoleAuth } from "../middleware/middlewareAuth";
import { adminRoleAuth } from "../middleware/middlewareAuth";

const userRouter = new Hono();

userRouter.get("/users", adminRoleAuth,UserController.getAllUsers);
userRouter.get("/users/:id", adminRoleAuth,UserController.getUserById);
userRouter.post("/users", userRoleAuth,UserController.createUser);
userRouter.put("/users/:id", userRoleAuth,UserController.updateUser);
userRouter.delete("/users/:id", userRoleAuth,UserController.deleteUser);

export default userRouter;
