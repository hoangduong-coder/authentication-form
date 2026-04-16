import { Request, Response } from "express";
import { LogInInfo, User, SignUpInfo } from "./types";
import * as authService from "./service";

export const loginController = (req: Request, res: Response) => {
    try {
        const { email, password }: LogInInfo = req.body;
        const user = authService.login({ email, password });

        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
        } else {
            res.status(200).json({ message: "Login successful", user });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const signUpController = (req: Request, res: Response) => {
    const { name, email, password }: SignUpInfo = req.body;
    // check if user exists
    try {
        authService.signUp({ name, email, password });
        res.status(201).json({ message: "User created successfully" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}