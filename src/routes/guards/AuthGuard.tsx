import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
    const { accessToken } = useSelector((state: RootState) => state.auth);

    if (!accessToken) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AuthGuard; 