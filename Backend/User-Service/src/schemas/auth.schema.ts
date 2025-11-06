import z from "zod"

export const emailSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
})


export const verifyOTPSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});
