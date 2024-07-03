export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    roles: string[];
    phone: string;
    createdBy: string;
    createdDate: string;
}

export interface CreateUser {
    firstName: string;
    lastName: string;
    email: string;
    roles: string[]|undefined;
    role: string;
    address: string;
    password: string;
    phone: string;
    organisationName: string;
}