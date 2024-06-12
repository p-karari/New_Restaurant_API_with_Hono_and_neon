import { eq } from "drizzle-orm";
import db from "../db";
import { OrderStatusTable,TSOrderStatusTable,TIOrderStatusTable } from "../schema";

export class StatusService{
    async getAllStatus(): Promise<TSOrderStatusTable[]> {
        return await db.query.OrderStatusTable.findMany();
    }
    async getStatusById(id:number): Promise<TIOrderStatusTable | undefined> {
        const status = await db.query.OrderStatusTable.findFirst({ where: eq(OrderStatusTable.id, id )})
        return status;
    }
    async createStatus(status: TIOrderStatusTable): Promise<TIOrderStatusTable> {
        const [newStatus] = await db.insert(OrderStatusTable).values(status).returning();
        return newStatus;
    }
    async updateStatus(id: number,statusData: Partial<TIOrderStatusTable>): Promise<TIOrderStatusTable | null> {
        const [updatedStatus] = await db.update(OrderStatusTable)
        .set(statusData)
        .where(eq(OrderStatusTable.id, id))
        .returning();
        return updatedStatus;
    }
    async deleteStatus(id: number) {
        await db.delete(OrderStatusTable).where(eq(OrderStatusTable.id, id));
        return "Order Status deleted Successfully"
    }
}