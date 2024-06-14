import { eq } from "drizzle-orm";
import db from "../db";
import { RestaurantOwnerTable,TIRestaurantOwnerTable,TSRestaurantOwnerTable } from "../schema";

export class RestaurantOwnerService{
    async getAllRestaurants(): Promise<TSRestaurantOwnerTable[]> {
        return await db.query.RestaurantOwnerTable.findMany();
    }
    async getRestaurantOwnerById(id:number): Promise<TIRestaurantOwnerTable | undefined> {
        const owner = await db.query.RestaurantOwnerTable.findFirst({ where: eq(RestaurantOwnerTable.id, id )})
        return owner;
    }
    async createRestaurantOwner(owner: TIRestaurantOwnerTable): Promise<TIRestaurantOwnerTable> {
        const [newOwner] = await db.insert(RestaurantOwnerTable).values(owner).returning();
        return newOwner;
    }
    async updateRestaurantOwner(id: number,ownerData: Partial<TIRestaurantOwnerTable>): Promise<TIRestaurantOwnerTable | null> {
        const [updatedOwner] = await db.update(RestaurantOwnerTable)
        .set(ownerData)
        .where(eq(RestaurantOwnerTable.id, id))
        .returning();
        return updatedOwner;
    }
    async deleteRestaurantOwner(id: number) {
        await db.delete(RestaurantOwnerTable).where(eq(RestaurantOwnerTable.id, id));
        return "Owner deleted Successfully"
    }
}