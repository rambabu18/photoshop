import React, { useEffect } from 'react'
import { useLocation, Outlet, Navigate } from 'react-router-dom'

function RequireAuth() {
    const location = useLocation();
    const token = localStorage.getItem("token")
    return (
        token
            ? <Outlet />
            : <Navigate to={token ? "/admin" : "/login"} state={{ from: location }} replace />
    )
}

export default RequireAuth