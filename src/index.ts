// import db from "./drizzle/db"
// import { UsersTable, StateTable,CityTable, AddressTable, RestaurantOwnerTable, RestaurantTable, MenuItemTable, OrderMenuItemTable, OrdersTable, OrderStatusTable, DriverTable, CommentTable, StatusCatalogTable  } from "./drizzle/schema";;

import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import userRouter from './drizzle/users/user.router';
import stateRouter from './drizzle/states/state.router';
import cityRouter from './drizzle/city/city.router'
import restaurantOwnerRouter from './drizzle/restaurantOwner/restaurant.owner.router'
import restaurantRouter from './drizzle/restaurant/restaurant.router'
import addressRouter from './drizzle/address/address.router';
import categoryRouter from './drizzle/category/category.router';
import orderMenuItemRouter from './drizzle/orderMenuItem/orderMenuItem.router';
import menuItemRouter from './drizzle/menuItem/menuItem.router';
import orderRouter from './drizzle/orders/order.router';
import statusRouter from './drizzle/orderStatus/order.status.router';
import driverRouter from './drizzle/driver/driver.router';
import { authRouter } from './drizzle/auth/auth.router';

const app = new Hono();

app.get('/ok', (c) => c.text('Hello, Hono!'));

const port = 3000

console.log(`Server is running on port ${port}`)

app.route("/", userRouter);
app.route("/", stateRouter);
app.route("/", cityRouter);
app.route("/", restaurantRouter);
app.route("/", restaurantOwnerRouter);
app.route("/", addressRouter);
app.route("/", categoryRouter);
app.route("/", orderMenuItemRouter);
app.route("/", menuItemRouter);
app.route("/", orderRouter);
app.route("/", statusRouter);
app.route("/", driverRouter);
app.route("/", authRouter )

serve({
  fetch: app.fetch,
  port 
})
