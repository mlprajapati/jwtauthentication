 //User modal interface 
export interface User {
    id: number;
    username:string;
    password:string;
    email: string;
    name: Name;
    status?: string;
    phoneNumbers: string[];
}
export interface Name {
    first: string;
    last?: string;
}
