import { ThunkDispatch } from "redux-thunk"

export interface LoginResponse{
    username: string,
    token: string
}

export interface LoginForm{
    username: string;
    password: string;
}

export interface UserState{
    data: LoginResponse;
    loading: boolean;
    error: string;
}

interface LOGIN_START{
    type: "LOGIN_START"
}

interface LOGIN_SUCCESS{
    type: "LOGIN_SUCCESS",
    payload: LoginResponse
}

interface LOGIN_ERROR{
    type: "LOGIN_ERROR"
}

interface IS_LOGGED_IN_START{
    type: "IS_LOGGED_IN_START"
}

interface IS_LOGGED_IN_SUCCESS{
    type: "IS_LOGGED_IN_SUCCESS",
    payload: LoginResponse
}

interface IS_LOGGED_IN_ERROR{
    type: "IS_LOGGED_IN_ERROR"
}

interface LOGOUT{
    type: "LOGOUT"
}

export type UserAction = 
    | LOGIN_START 
    | LOGIN_SUCCESS 
    | LOGIN_ERROR
    | IS_LOGGED_IN_START
    | IS_LOGGED_IN_SUCCESS
    | IS_LOGGED_IN_ERROR
    | LOGOUT;
export type UserDispatch = ThunkDispatch<UserState, void,UserAction>;