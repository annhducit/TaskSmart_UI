import { Outlet } from "react-router-dom";

/**
 * 
 * @returns Authenticate layout component
 * @author Duc Nguyen
 */
const AuthenticateLayout = () => {
    return (
        <div>
            This is authenticate layout
            <Outlet/>
        </div>
    );
};

export default AuthenticateLayout;