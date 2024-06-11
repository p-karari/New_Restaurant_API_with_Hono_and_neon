// import { Hono } from "hono";
// import { Context } from "hono";


// export const userRouter = new Hono();

// const users = [
//     {
//         id: 1,
//         name: "John Doe",
//         email: "john@amail.com"
//     },
//     {
//         id: 2,
//         name: "Jane Doe",
//         email: "jane@email.com"
//     }
// ]


// //get all users
//  userRouter.get("/users", (c:Context ) => {
//     return c.json(users, 200);
//  })

//  //get a single user
//  userRouter.get("/users/:id", (c: Context) => {
//     const id = Number(c.req.param("id"));
//     const user = users.find((user) => user.id === id);
  
//     if (user) {
//       return c.json(user, 200);
//     } else {
//       return c.json({ message: "User not found" }, 404);
//     }
//   });

//   //create a user

//   userRouter.post("/users", async(c: Context) => {
//     const user = await c.req.json();
//     if (!user) {
//         return c.text("Invalid request", 400)
//     }
//     users.push(user)
//     return c.json(user, 201);
//   })

//   //updating a user

//   userRouter.put("/users/:id", async(c: Context) => {
//     const id = Number(await c.req.param("id"));
//     const user = await c.req.json();
//     const foundUser = users.find((user) => user.id === id);
//     if (!foundUser) {
//         return c.text("User not found ", 404)
//     }
//     Object.assign(foundUser, user);
//     return c.json(user, 200);
//   })

// router.ts
import { Hono } from "hono";
import { UserController } from "./user.controller";

const userRouter = new Hono();

userRouter.get("/users", UserController.getAllUsers);
userRouter.get("/users/:id", UserController.getUserById);
userRouter.post("/users", UserController.createUser);
userRouter.put("/users/:id", UserController.updateUser);

export default userRouter;
