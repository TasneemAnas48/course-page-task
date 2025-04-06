// import { RootState } from "@/store/store";
// import { useSelector } from "react-redux";
import {  Outlet } from "react-router-dom";

const GuestGuard = () => {
    // const { accessToken } = useSelector((state: RootState) => state.auth);

    // if (accessToken) {
    //     return <Navigate to="/user-profile" replace />;
    // }

    return <Outlet />;
};

export default GuestGuard; 