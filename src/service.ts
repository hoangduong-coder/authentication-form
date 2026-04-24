import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import userDataJson from "./dummy.json";
import { LogInInfo, SignUpInfo, User } from "./types";

const userData: User[] = userDataJson as User[];
const secretKey = process.env.JWT_SECRET;

const login = async ({email, password}: LogInInfo) => {
    const user = userData.find((user: User) => user.email === email)
    const comparePasswordResult = user 
        ? await bcrypt.compare(password, user.password)
        : false;

    if (!(user && comparePasswordResult)) {
        throw new Error("Incorrect email or password!")
    }

    const loginToken = jwt.sign({ id: user.id, email: user.email }, secretKey as string, { expiresIn: "1h" });

    return { token: loginToken , email: user.email };
}

const signUp = async ({name, email, password}: SignUpInfo) => {
    const existingUser = userData.find((user: User) => user.email === email);
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
        id: userData.length + 1,
        name,
        email,
        password: hashedPassword
    }

    userData.push(newUser);
}

export { login, signUp };