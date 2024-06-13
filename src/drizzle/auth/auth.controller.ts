import "dotenv/config";
import { Context } from "hono";
import { createAuthUserService, userLoginService } from "./auth.service";
import bycrpt from "bcrypt";
import { sign } from "hono/jwt";
import assert from "assert";

assert(process.env.JWT_SECRET, "JWT_SECRET is not set in the .env file");


export const registerUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword = await bycrpt.hash(pass, 10);
        user.password = hashedPassword;
        const createdUser = await createAuthUserService(user);
        if (!createdUser) return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}


export const loginUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        //check user exist
        const userExist = await userLoginService(user);
        if (userExist === null) return c.json({ error: "User not found" }, 404);  // not found         
        const userMatch = await bycrpt.compare(user.password, userExist?.password as string);
        if (!userMatch) {
            return c.json({ error: "Invalid credentials" }, 401);  // unauthorized
        } else {
            // create a payload
            const payload = {
                sub: userExist?.username,
                role: userExist?.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 180)  // 3 hour  => SESSION EXPIRATION
            }
            let secret = process.env.JWT_SECRET as string;  // secret key
            const token = await sign(payload, secret);   // create a JWT token
            let role = userExist?.role;
            return c.json({ token, user: { role } }, 200);  // return token and user role
        }
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
