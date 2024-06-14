import { eq } from "drizzle-orm";
import db from "../db";
import { TIUsersTable,TSUsersTable,UsersTable } from "../schema";

export class UserService {
  async getAllUsers(): Promise<TSUsersTable[]> {
    return await db.query.UsersTable.findMany();
  }

  async getUserById(id: number): Promise<TIUsersTable | undefined> {
    const user = await db.query.UsersTable.findFirst({ where: eq(UsersTable.id, id) });
    return user;
  }

  async createUser(user: TIUsersTable): Promise<TSUsersTable> {
    const [newUser] = await db.insert(UsersTable).values(user).returning();
    return newUser;
  }

  async updateUser(id: number, userData: Partial<TIUsersTable>): Promise<TIUsersTable | null> {
    const [updatedUser] = await db.update(UsersTable)
      .set(userData)
      .where(eq(UsersTable.id, id))
      .returning();
    return updatedUser;
  }

  async deleteUser(id: number) {
      await db.delete(UsersTable).where(eq(UsersTable.id, id));
      return "User deleted successfully"
  }
}
