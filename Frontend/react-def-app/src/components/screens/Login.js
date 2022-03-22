import {useState} from "react";
import LoginForm from "../functions/LoginForm";

const Login = () => {

    const adminUser = {
        email: "admin@admin.com",
        password: "admin123"
    }
    const [user, setUser] = useState({name: "", email: ""});
    const [error, setError] = useState("");

    const Login = details =>{
        console.log(details);

        if (details.email === adminUser.email && details.password === adminUser.password){
            console.log("Logged In");
            setUser({
                name: details.name,
                email:details.email
            });
        }else {
            console.log("Details do not match!");
            setError("Details do not match!")
        }
    }
    const Logout = details =>{
        console.log("Logout");
        setUser({
            name: "",
            email: ""
        });
    }

  return(
      <main className={"login-screen"}>
          <div>
              {(user.email !== "") ? (
                  <div className={"login-welcomescreen"}>
                    <h2>Welcome, <span>{user.name}</span></h2>
                      <button onClick={Logout}>Logout</button>
                  </div>
              ) : (
                  <div className="login-form">
                      <LoginForm Login={Login} error={error}/>
                  </div>
              )}
          </div>
      </main>

  )
}

export default Login;