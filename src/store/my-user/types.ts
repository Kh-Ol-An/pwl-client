export interface ILogin {
    email: string;
    password: string;
}

export interface IRegistration extends ILogin {
    name: string;
}

export interface IUpdateUser {
    id: string;
    name: string;
    birthday: string;
    avatar: File | null | string;
}
