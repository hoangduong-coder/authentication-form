import { Request, Response } from "express";
import { LogInInfo, User, SignUpInfo } from "./types";
import * as authService from "./service";

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password }: LogInInfo = req.body;
        const user = await authService.login({ email, password });

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An internal server error occurred" });
        }
    }
};

export const signUpController = async (req: Request, res: Response) => {
    const { name, email, password }: SignUpInfo = req.body;
    // check if user exists
    try {
        await authService.signUp({ name, email, password });
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An internal server error occurred" });
        }
    }
}