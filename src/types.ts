export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface LogInInfo {
    email: string;
    password: string;
}

export type SignUpInfo = Omit<User, "id">;