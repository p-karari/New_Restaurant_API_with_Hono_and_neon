import { Hono } from "hono";
import { CategoryController } from "./category.controller";

const categoryRouter = new Hono();

categoryRouter.get("/category", CategoryController.getAllCategories);
categoryRouter.get("/category/:id", CategoryController.getCategoryById);
categoryRouter.post("/category", CategoryController.createCategory);
categoryRouter.put("/category/:id", CategoryController.updateCategory);
categoryRouter.delete("/category/:id", CategoryController.deleteCategory);




export default categoryRouter;