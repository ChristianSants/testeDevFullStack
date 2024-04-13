import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = (Component) => (props) => {
    const token = localStorage.getItem('token');
    const expiredAt = localStorage.getItem('expired_at');

    if (!token || isTokenExpired(expiredAt)) {
        // Remova o token expirado do localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('expired_at');

        return <Navigate to={'/login'} />;
    }

    return <Component {...props} />;
};

function isTokenExpired(expiredAt) {
    if (!expiredAt) return true;
    const expirationDate = new Date(expiredAt);
    const currentTime = new Date();
    return expirationDate.getTime() < currentTime.getTime();
}

export default PrivateRoute;