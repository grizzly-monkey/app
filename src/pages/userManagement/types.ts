export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    contactNumber: string;
    createdBy: string;
    createdDate: string;
}

export interface CreateUser {
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    contactNumber: string;
}