import React from "react";
import { useSelector } from "react-redux";
import HomePage from "../pages/HomePage";

const PrivateRoute = ({
    component: Component,
    checkIsAdmin,
    checkIsSeller,
    ...rest
}) => {
    const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
    const isAdmin = useSelector((state) =>
        state.auth.userData.role ? state.auth.userData.role === "admin" : null
    );
    const isSeller = useSelector((state) =>
        state.auth.userData.role
            ? state.auth.userData.role === "seller"
            : null
    );
    if (isAdmin && isLoggedIn && !!checkIsAdmin) {
        // if you are an admin and logged in

        return <Component {...rest} />;
    } else if (isLoggedIn && isSeller && !!checkIsSeller) {
        // if you are a seller and logged in
        return <Component {...rest} />;
    } else if (
        isLoggedIn &&
        !isAdmin &&
        isAdmin !== null &&
        (!!checkIsAdmin || !!checkIsSeller)
    ) {
        // if you are not an admin and logged in
        return (
            <HomePage
                {...rest}
                showForm={false}
                checkIsAdmin={true}
                checkIsSeller={true}
            />
        );
    }
    // user is logged in or logged out
    return (
        // if user is authenticated render that route else redirect to home page with login form
        <>
            {isLoggedIn ? (
                <Component {...rest} />
            ) : (
                <>
                    <HomePage
                        {...rest}
                        showForm={true}
                        checkIsAdmin={false}
                        checkIsSeller={false}
                    />
                </>
            )}
        </>
    );
};

export default PrivateRoute;
