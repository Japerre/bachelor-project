import React from "react";
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute (){
    let auth = null;
    if(localStorage.getItem("token")){
        auth = true;
    }
    return auth ? <Outlet /> : <Navigate to = "/login"/>;
}

export default ProtectedRoute