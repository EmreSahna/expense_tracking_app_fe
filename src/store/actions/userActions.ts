import { LoginForm, User, UserDispatch } from "../../types/user";
import api from "../../utils/api";

export const login = (creds: LoginForm) => async (dispatch: UserDispatch) => {
    dispatch({ type: "LOGIN_START"});
    try {
        const response = await api().post<User>("/user/login",creds);
        dispatch({type:"LOGIN_SUCCESS", payload: response.data})
        localStorage.setItem("token","response.data.token => mean token here.");
    } catch{
        dispatch({type: "LOGIN_ERROR"});
    }
};