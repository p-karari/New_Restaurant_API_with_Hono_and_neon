import { eq } from "drizzle-orm";
import db from "../db";
import { MenuItemTable,TSMenuItemTable,TIMenuItemTable } from "../schema";

export class MenuItemService{
    async getAllItems(): Promise<TSMenuItemTable[]> {
        return await db.query.MenuItemTable.findMany();
    }
    async getItemById(id:number): Promise<TIMenuItemTable | undefined> {
        const item = await db.query.MenuItemTable.findFirst({ where: eq(MenuItemTable.id, id )})
        return item;
    }
    async createItem(item: TIMenuItemTable): Promise<TIMenuItemTable> {
        const [newItem] = await db.insert(MenuItemTable).values(item).returning();
        return newItem;
    }
    async updateItems(id: number,itemsData: Partial<TIMenuItemTable>): Promise<TIMenuItemTable | null> {
        const [updatedItems] = await db.update(MenuItemTable)
        .set(itemsData)
        .where(eq(MenuItemTable.id, id))
        .returning();
        return updatedItems;
    }
    async deleteItem(id: number) {
        await db.delete(MenuItemTable).where(eq(MenuItemTable.id, id));
        return "Item deleted Successfully"
    }
}