export class Person {
    name: string | null;
    last_name: string | null;
    age: number | null;
    email: string | null;
    password: string | null;

    constructor(pName: string | null = null, pLast_name: string | null = null, pAge: number | null = null, pEmail: string | null, pPassword: string | null = null) {
        this.name = pName;
        this.last_name = pLast_name;
        this.age = pAge;
        this.email = pEmail;
        this.password = pPassword
    }
}