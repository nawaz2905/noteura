import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_PASSCODE) {
    throw new Error("JWT is not defined in this environment");
}
if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB URL is not defined in this environment")
}
export const JWT_PASSCODE = process.env.JWT_PASSCODE!;
export const MONGODB_URL = process.env.MONGODB_URL;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;