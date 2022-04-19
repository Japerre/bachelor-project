import { Outlet, Navigate } from 'react-router-dom';
import parseJwt from "./parseJWT";

function ProtectedRoute (){
    let auth = null;
    const token  = localStorage.getItem("token");
    if(token){
        auth = true;
        parseJwt(token)
    }
    return auth ? <Outlet /> : <Navigate to = "/login" />;
}

export default ProtectedRoute