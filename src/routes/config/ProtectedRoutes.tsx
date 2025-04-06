import { RouteObject } from "react-router-dom";
import AuthGuard from "../guards/AuthGuard";

export const protectedRoutes: RouteObject = {
    element: <AuthGuard />,
    children: []
}
