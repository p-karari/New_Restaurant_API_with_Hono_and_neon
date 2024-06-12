import { eq } from "drizzle-orm";
import db from "../db";
import { CityTable,TSCityTable,TICityTable } from "../schema";

export class CityService{
    async getAllCities(): Promise<TSCityTable[]> {
        return await db.query.CityTable.findMany();
    }
    async getCityById(id:number): Promise<TICityTable | undefined> {
        const city = await db.query.CityTable.findFirst({ where: eq(CityTable.id, id )})
        return city;
    }
    async createCity(city: TICityTable): Promise<TICityTable> {
        const [newCity] = await db.insert(CityTable).values(city).returning();
        return newCity;
    }
    async updateCity(id: number,cityData: Partial<TICityTable>): Promise<TICityTable | null> {
        const [updatedCity] = await db.update(CityTable)
        .set(cityData)
        .where(eq(CityTable.id, id))
        .returning();
        return updatedCity;
    }
    async deleteCity(id: number) {
        await db.delete(CityTable).where(eq(CityTable.id, id));
        return "City deleted Successfully"
    }
}