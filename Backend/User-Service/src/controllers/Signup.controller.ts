import { Request, Response } from "express";
import { emailSchema, verifyOTPSchema } from "../schemas/auth.schema";
import { prisma } from "../config/prisma";
import jwt from "jsonwebtoken"
import kafka from "../config/kafka";
import { promise } from "zod";
import { redis } from "../config/redis";

import crypto from "crypto";


const sendOTPToEmail = async (otp: string, to: string) => {
    try {
        const producer = kafka.producer();
        await producer.connect();
        await producer.send({
            topic: "email-service",
            messages: [
                {
                    value: JSON.stringify({
                        otp,
                        to
                    }),
                },
            ],
        })
    } catch (error) {
        console.log("error in sending email", error)
    }
}

export const validateEmail = async (req: Request, res: Response) => {
    try {

        const email = emailSchema.safeParse(req.body);
        if (!email.success) {
            return res.status(400).json({
                success: false,
                message: email.error.issues[0].message
            })
        }
        const user = await prisma.user.findUnique({
            where: {
                email: email.data.email
            }
        })
        if (user) {
            return res.status(400).json({
                success: true,
                message: "Email already exists"
            })
        }
        const otp = Math.floor(Math.random() * 1000000);

        const alreadyExistingOTP = await prisma.signupOTP.findUnique({
            where: {
                email: email.data.email
            }
        })

        if (alreadyExistingOTP) {

            if (alreadyExistingOTP.Attempts > 3) {
                return res.status(400).json({
                    success: false,
                    message: "Too many attempts"
                })
            }

            await prisma.signupOTP.update({
                where: {
                    email: email.data.email
                },
                data: {
                    otp,
                    createdAt: new Date(),
                    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
                    Attempts: alreadyExistingOTP.Attempts + 1
                }
            })

            await sendOTPToEmail(otp.toString(), email.data.email)
            return res.status(200).json({
                success: true,
                message: "OTP sent successfully",
                otp
            })
        }


        await prisma.signupOTP.create({
            data: {
                email: email.data.email,
                otp,
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 5 * 60 * 1000),
                Attempts: 1
            }
        })

        await sendOTPToEmail(otp.toString(), email.data.email)
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",

        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}


export const signup = async (req: Request, res: Response) => {
    try {
        const parsed = verifyOTPSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                message: parsed.error.issues[0].message,
            });
        }

        const { email, otp } = parsed.data;

        const otpObject = await prisma.signupOTP.findUnique({
            where: { email },
        });

        if (!otpObject) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
        if (otpObject.otp !== hashedOtp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        if (otpObject.expiresAt < new Date()) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired",
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

       const user =  await Promise.all([
            prisma.user.create({
                data: {
                    email,
                    name: email.split("@")[0],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            }),
            prisma.signupOTP.delete({ where: { email } }),
        ]);

        const [accessToken, refreshToken] = await Promise.all([
            tokenGenerator(email, "access"),
            tokenGenerator(email, "refresh"),
        ]);

        await redis.set(
            `session:${email}`,
            JSON.stringify({ accessToken }),
            "EX",
            24 * 60 * 60
        );


        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: "none",
            secure: true,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true,
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        console.error("Error in verifyOTP controller:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


export const tokenGenerator = (email:string ,userID: string, type: "access" | "refresh") => {
    try {
        const token = jwt.sign({
            userID,
        }, process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: type === "access" ? "15m" : "1d"
            }
        )
        return token
    } catch (error) {

    }
}


export const Logout = async (req: Request, res: Response) => {
    try {

        await redis.del(`session:${req.user.email}`)
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}