import { eq } from "drizzle-orm";
import db from "../db";
import { RestaurantTable,TSRestaurantTable,TIRestaurantTable } from "../schema";

export class RestaurantService{
    async getAllRestaurants(): Promise<TSRestaurantTable[]> {
        return await db.query.RestaurantTable.findMany();
    }
    async getRestaurantById(id:number): Promise<TIRestaurantTable | undefined> {
        const restaurant = await db.query.RestaurantTable.findFirst({ where: eq(RestaurantTable.id, id )})
        return restaurant;
    }
    async createRestaurant(restaurant: TIRestaurantTable): Promise<TIRestaurantTable> {
        const [newRestaurant] = await db.insert(RestaurantTable).values(restaurant).returning();
        return newRestaurant;
    }
    async updateRestaurant(id: number,restaurantData: Partial<TIRestaurantTable>): Promise<TIRestaurantTable | null> {
        const [updatedRestaurant] = await db.update(RestaurantTable)
        .set(restaurantData)
        .where(eq(RestaurantTable.id, id))
        .returning();
        return updatedRestaurant;
    }
    async deleteRestaurant(id: number) {
        await db.delete(RestaurantTable).where(eq(RestaurantTable.id, id));
        return "Restaurant deleted Successfully"
    }
}