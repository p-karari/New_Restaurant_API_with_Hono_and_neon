import { eq } from "drizzle-orm";
import db from "../db";
import { OrderMenuItemTable,TSOrderMenuItemTable,TIOrderMenuItemTable } from "../schema";

export class OrderService{
    async getAllOrderMenuItems(): Promise<TSOrderMenuItemTable[]> {
        return await db.query.OrderMenuItemTable.findMany();
    }
    async getOrderMenuItemById(id:number): Promise<TIOrderMenuItemTable | undefined> {
        const menuItem = await db.query.OrderMenuItemTable.findFirst({ where: eq(OrderMenuItemTable.id, id )})
        return menuItem;
    }
    async createMenuItem(menuItem: TIOrderMenuItemTable): Promise<TIOrderMenuItemTable> {
        const [newMenuItem] = await db.insert(OrderMenuItemTable).values(menuItem).returning();
        return newMenuItem;
    }
    async updateMenuItem(id: number,orderMenuData: Partial<TIOrderMenuItemTable>): Promise<TIOrderMenuItemTable | null> {
        const [updatedMenuItem] = await db.update(OrderMenuItemTable)
        .set(orderMenuData)
        .where(eq(OrderMenuItemTable.id, id))
        .returning();
        return updatedMenuItem;
    }
    async deleteMenuItem(id: number) {
        await db.delete(OrderMenuItemTable).where(eq(OrderMenuItemTable.id, id));
        return "Menu Item deleted Successfully"
    }
}