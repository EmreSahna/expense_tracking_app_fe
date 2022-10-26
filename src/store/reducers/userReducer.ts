import { LoginResponse, UserAction, UserState } from "../../types/user";

const defaultState: UserState = {
    data: {} as LoginResponse,
    loading: false,
    error: ""
}

const userReducer = (state: UserState = defaultState,action: UserAction) => {
    switch (action.type) {
        case "LOGIN_START":
            return {...state, loading: true, error: ""};
        case "IS_LOGGED_IN_START":
            return {...state, loading: true, error: ""};
        case "LOGIN_SUCCESS":
            return {...state, loading: false, data: action.payload};
        case "IS_LOGGED_IN_SUCCESS":
            return {...state, loading: false, data: action.payload};
        case "LOGIN_ERROR":
            return {...state, loading: false, error: "Longin failed."};
        case "IS_LOGGED_IN_ERROR":
            return {...state, loading: false, error: "Token failed."};
        case "LOGOUT":
            return { ...state, data: {} as LoginResponse };
        default:
            return state;
    }
};

export default userReducer;