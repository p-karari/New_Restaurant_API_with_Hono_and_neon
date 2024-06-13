import { AuthOnUsersTable, TIAuthOnUser, TSAuthOnUser } from "../schema";
import db from "../db";
import { sql } from "drizzle-orm";

export const createAuthUserService = async (user: TIAuthOnUser): Promise<string | null> => {
    await db.insert(AuthOnUsersTable).values(user)
    return "User created successfully";
}

export const userLoginService = async (user: TSAuthOnUser) => {
    const { username, password } = user;
    return await db.query.AuthOnUsersTable.findFirst({
        columns: {
            username: true,
            role: true,
            password: true
        }, where: sql` ${AuthOnUsersTable.username} = ${username}`,
        with: {
            user: {
                columns: {
                    name: true,
                    address: true,
                    id: true
                }
            }
        }
    })
}