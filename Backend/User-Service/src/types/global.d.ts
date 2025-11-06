import { Request } from "express";


interface User {
    userID: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

export {}