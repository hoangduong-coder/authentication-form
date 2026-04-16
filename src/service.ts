import userData from "./dummy.json";
import { LogInInfo, SignUpInfo, User } from "./types";

const login = ({email, password}: LogInInfo) => {
    return userData.find((user: User) => user.email === email && user.password === password);
}

const signUp = ({name, email, password}: SignUpInfo) => {
    const existingUser = userData.find((user: User) => user.email === email);
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const newUser: User = {
        id: userData.length + 1,
        name,
        email,
        password
    }

    userData.push(newUser);
}

export { login, signUp };