import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../generated/prisma/client.js";
import { bearer } from "better-auth/plugins";


const databaseUrl = process.env.DATABASE_URL;
if(!databaseUrl){
    throw new Error("DATABASE_URL is not set");
}
const adapter = new PrismaPg({ connectionString:databaseUrl});
export const prisma = new PrismaClient({adapter});

export const auth =  betterAuth({
    database: prismaAdapter(prisma,{
        provider: "postgresql"
    }),
    emailAndPassword: {
        enabled:true,
    },
    plugins: [bearer()],
});