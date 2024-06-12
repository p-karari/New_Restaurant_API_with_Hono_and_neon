import { eq } from "drizzle-orm";
import db from "../db";
import { OrdersTable,TSOrdersTable,TIOrdersTable } from "../schema";

export class OrderService{
    async getAllOrders(): Promise<TSOrdersTable[]> {
        return await db.query.OrdersTable.findMany();
    }
    async getOrderById(id:number): Promise<TIOrdersTable | undefined> {
        const item = await db.query.OrdersTable.findFirst({ where: eq(OrdersTable.id, id )})
        return item;
    }
    async createOrder(item: TIOrdersTable): Promise<TIOrdersTable> {
        const [newOrder] = await db.insert(OrdersTable).values(item).returning();
        return newOrder;
    }
    async updateOrder(id: number,orderData: Partial<TIOrdersTable>): Promise<TIOrdersTable | null> {
        const [updatedOrder] = await db.update(OrdersTable)
        .set(orderData)
        .where(eq(OrdersTable.id, id))
        .returning();
        return updatedOrder;
    }
    async deleteOrder(id: number) {
        await db.delete(OrdersTable).where(eq(OrdersTable.id, id));
        return "City deleted Successfully"
    }
}