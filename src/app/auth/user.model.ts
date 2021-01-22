export interface User {
    id? : string;
    firstname? : string;
    lastname?: string;
    //username: string;
    password?: string;
    email : string;
    //matching_passwords? : string[];

}

export interface RegisterUser{
    id? : string;
    firstname? : string;
    lastname?: string;
    email : string;
    matching_passwords: any;
}