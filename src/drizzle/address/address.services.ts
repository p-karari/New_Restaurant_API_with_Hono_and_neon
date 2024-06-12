import { eq } from "drizzle-orm";
import db from "../db";
import { AddressTable,TSAddressTable,TIAddressTable } from "../schema";

export class AddressService{
    async getAllAddress(): Promise<TSAddressTable[]> {
        return await db.query.AddressTable.findMany();
    }
    async getAddressById(id:number): Promise<TIAddressTable | undefined> {
        const address = await db.query.AddressTable.findFirst({ where: eq(AddressTable.id, id )})
        return address;
    }
    async createAddress(address: TIAddressTable): Promise<TIAddressTable> {
        const [newAddress] = await db.insert(AddressTable).values(address).returning();
        return newAddress;
    }
    async updateAddress(id: number,addressData: Partial<TIAddressTable>): Promise<TIAddressTable | null> {
        const [updatedAddress] = await db.update(AddressTable)
        .set(addressData)
        .where(eq(AddressTable.id, id))
        .returning();
        return updatedAddress;
    }
    async deleteAddress(id: number) {
        await db.delete(AddressTable).where(eq(AddressTable.id, id));
        return "Address deleted Successfully"
    }
}