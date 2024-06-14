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

app.get('/', (c) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Restaurant API</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f8f9fa;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                color: #333;
            }
            .container {
                text-align: center;
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #007bff;
            }
            p {
                font-size: 1.2em;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Restaurant API</h1>
            <p>This is a restaurant API, created by KELVIN KARARI.</p>
        </div>
    </body>
    </html>
  `;
  return c.html(htmlContent);
});
serve({
  fetch: app.fetch,
  port 
})


