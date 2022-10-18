import { Route, RouteProps, Navigate, PathRouteProps, IndexRouteProps} from "react-router-dom";

type PrivateRouteProps = {
    component: JSX.Element
}

function PrivateRoute({component}: PrivateRouteProps) {
    const token = localStorage.getItem("token");
    if(token){
        return component;
    }
    return <Navigate to="/login" />;
}

export default PrivateRoute;