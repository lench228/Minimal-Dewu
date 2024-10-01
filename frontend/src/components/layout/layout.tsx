import React, {Dispatch, SetStateAction, useEffect} from "react";
import NavBar from "../nav/nav-bar";
import {Outlet, useLocation, useNavigate, useSearchParams} from "react-router-dom";

const Layout: React.FC<{ isAuthenticated: boolean, setIsPopupOpen: Dispatch<SetStateAction<boolean>> }> = ({ isAuthenticated, setIsPopupOpen }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    // Закрытые маршруты
    const closedRoutes = ['/profile', '/order'];
    useEffect(() => {

        const isProtectedRoute = closedRoutes.includes(location.pathname);

        if (isProtectedRoute && !isAuthenticated) {
            if (searchParams.get('open') !== 'login') {
                setSearchParams({open: 'login'})
                setIsPopupOpen(true);
            }
        } else {
            if (searchParams.has('open')) {
                searchParams.delete('open');
                setIsPopupOpen(false);
            }
        }
    }, [location.pathname, isAuthenticated, searchParams, setSearchParams]);

    return (
        <div className="h-full flex bg-[#2b2b2b]">
            <NavBar />
            <main className="w-full">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
