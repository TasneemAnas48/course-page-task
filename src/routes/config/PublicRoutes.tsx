import { RouteObject } from "react-router-dom";
import GuestGuard from "../guards/GuestGuard";

export const publicRoutes: RouteObject = {
    element: <GuestGuard />,
    children: [
        {
            id: "home",
            path: "/home",
            lazy: async () => {
                const module = await import("@/views/home/pages/HomePage");
                return { element: <module.default /> };
            },
        },
    ]
}
