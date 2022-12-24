import { FinishedGame } from "./game";
export interface NewUser {
    username: string;
    password: string;
    repeatPassword: string;
}
export declare type UserCredentials = Omit<NewUser, 'repeatPassword'>;
export interface UserPayload {
    username: string;
    id: number;
}
export interface Tokens {
    accessToken: string;
    refreshToken: string;
}
export declare type UserResponse = UserPayload & Tokens;
export interface TokenPayload extends UserPayload {
    iat: number;
    exp: number;
}
export interface GameCounts {
    victories: number;
    defeats: number;
    draws: number;
}
export interface PlayerStats {
    games: FinishedGame[];
    gameCounts: GameCounts;
}
