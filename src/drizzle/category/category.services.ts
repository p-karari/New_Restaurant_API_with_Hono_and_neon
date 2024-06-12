import { eq } from "drizzle-orm";
import db from "../db";
import { CategoryTable,TSCategoryTable,TICategoryTable } from "../schema";

export class CategoryService{
    async getAllCategories(): Promise<TSCategoryTable[]> {
        return await db.query.CategoryTable.findMany();
    }
    async getCategoryById(id:number): Promise<TICategoryTable | undefined> {
        const category = await db.query.CategoryTable.findFirst({ where: eq(CategoryTable.id, id )})
        return category;
    }
    async createCategory(category: TICategoryTable): Promise<TICategoryTable> {
        const [newCategory] = await db.insert(CategoryTable).values(category).returning();
        return newCategory;
    }
    async updateCategory(id: number,categoryData: Partial<TICategoryTable>): Promise<TICategoryTable | null> {
        const [updatedCategory] = await db.update(CategoryTable)
        .set(categoryData)
        .where(eq(CategoryTable.id, id))
        .returning();
        return updatedCategory;
    }
    async deleteCategory(id: number) {
        await db.delete(CategoryTable).where(eq(CategoryTable.id, id));
        return "Category deleted Successfully"
    }
}