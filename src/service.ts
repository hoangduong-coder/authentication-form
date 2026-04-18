import bcrypt from "bcrypt"
import userDataJson from "./dummy.json";
import { LogInInfo, SignUpInfo, User } from "./types";

const userData: User[] = userDataJson as User[];

const login = async ({email, password}: LogInInfo) => {
    const user = userData.find((user: User) => user.email === email)
    const comparePasswordResult = user 
        ? await bcrypt.compare(password, user.password)
        : false;

    if (!(user && comparePasswordResult)) {
        throw new Error("Incorrect email or password!")
    }

    return { id: user.id, name: user.name, email: user.email };
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