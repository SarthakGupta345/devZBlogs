import express, { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { redis } from "../config/redis";
import { tokenGenerator } from "../controllers/Signup.controller";

interface DecodedToken extends JwtPayload {
    userID: string;
    email: string;
}

export const loginMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accessToken, refreshToken } = req.cookies;

        if (!accessToken && !refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const accessCheck = verifyToken(accessToken, "access");

        if (accessCheck.valid) {
            const redisSession = await redis.get(`session:${accessCheck.decoded?.email}`);
            if (!redisSession) {
                return res.status(401).json({ success: false, message: "Session expired" });
            }

            req.user = {
                email: accessCheck.decoded!.email,
                userID: accessCheck.decoded!.userID,
            };

            return next();
        }

        if (accessCheck.expired && refreshToken) {
            const refreshCheck = verifyToken(refreshToken, "refresh");

            if (!refreshCheck.valid) {
                return res.status(401).json({ success: false, message: "Invalid refresh token" });
            }

            const email = refreshCheck.decoded!.email;
            const userID = refreshCheck.decoded!.userID;

            const redisSession = await redis.get(`session:${email}`);
            if (!redisSession) {
                return res.status(401).json({ success: false, message: "Session expired" });
            }

            const newAccessToken = tokenGenerator(email,userID, "access");

            await redis.set(
                `session:${email}`,
                JSON.stringify({ accessToken: newAccessToken }),
                "EX",
                24 * 60 * 60
            );

            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000,
                sameSite: "none",
                secure: true,
            });

            req.user = { email, userID };
            return next();
        }

        return res.status(401).json({ success: false, message: "Invalid token" });
    } catch (error) {
        console.error("Error in login middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


const verifyToken = (token: string, type: "access" | "refresh") => {
    try {
        const secret =
            type === "access"
                ? process.env.ACCESS_TOKEN_SECRET!
                : process.env.REFRESH_TOKEN_SECRET!;
        const decoded = jwt.verify(token, secret) as DecodedToken;
        return { valid: true, expired: false, decoded };
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return { valid: false, expired: true, decoded: null };
        }
        return { valid: false, expired: false, decoded: null };
    }
};
