import { eq } from "drizzle-orm";
import db from "../db";
import { DriverTable,TSDriverTable,TIDriverTable } from "../schema";

export class DriverService{
    async getAllDrivers(): Promise<TSDriverTable[]> {
        return await db.query.DriverTable.findMany();
    }
    async getDriverById(id:number): Promise<TIDriverTable | undefined> {
        const driver = await db.query.DriverTable.findFirst({ where: eq(DriverTable.id, id )})
        return driver;
    }
    async createDriver(driver: TIDriverTable): Promise<TIDriverTable> {
        const [newDriver] = await db.insert(DriverTable).values(driver).returning();
        return newDriver;
    }
    async updateDriver(id: number,driverData: Partial<TIDriverTable>): Promise<TIDriverTable | null> {
        const [updatedDriver] = await db.update(DriverTable)
        .set(driverData)
        .where(eq(DriverTable.id, id))
        .returning();
        return updatedDriver;
    }
    async deleteDriver(id: number) {
        await db.delete(DriverTable).where(eq(DriverTable.id, id));
        return "Driver deleted Successfully"
    }
}