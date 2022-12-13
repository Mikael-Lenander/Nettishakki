export interface NewUser {
    username: string;
    password: string;
    repeatPassword: string;
}
export declare type UserCredentials = Omit<NewUser, 'repeatPassword'>;
