import { useState, useEffect, useContext } from "react";
import axios from "axios";
import parseJWT from "../components/Authenticate/parseJWT";
import { UserContext } from "../components/UserContext";

const Login = () => {

  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [token, setToken] = useState("");

  const {user, setUser} = useContext(UserContext)

  axios.defaults.withCredentials = true; // weet niet wat dit doet

  useEffect( () => {
    if(localStorage.getItem("token")){
      axios.get("http://localhost:8080/whoami", {
        headers: { Authorization: localStorage.getItem("token") },
      }).then((data) => {
        setUser(data.data)
      }).catch((error) => {

      })
    }
  },[])

  const login = (e) => {

    e.preventDefault()
    
    axios
      .post("http://localhost:8080/authenticate", {
        username: usernameLog,
        password: passwordLog,
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoginStatus("bad credentials");
      })
      .then((response) => {
        console.log(response.data);
        // localStorage.setItem("user", response.data.user.role);
        setLoginStatus("")
        localStorage.setItem("token", "Bearer " + response.data.jwt);
        setToken(response.data.jwt);
        console.log(response.data.user)
        setUser(response.data.user)
        window.location.reload(false) // alles eens herladen 
      });
  };

  return (
    <>
      {user.userId ? (
        <>
          <h1>succesfully signed in as {user.firstName + " " + user.lastName}</h1>
          <button
            onClick={() => {
              localStorage.clear()
              setToken("")
              window.location.reload(false)
            }}
          >
            logout
          </button>
        </>
      ) : (
        <>
          <form>
            <h1>login</h1>
            <label htmlFor="">username</label>
            <input
              type="text"
              onChange={(e) => {
                setUsernameLog(e.target.value);
              }}
            />
            <label htmlFor="">Password</label>
            <input
              type="password"
              onChange={(e) => {
                setPasswordLog(e.target.value);
              }}
            />
            <button onClick={(e) => login(e)}>login</button>
          </form>
          <h1 style={{color: "red"}}>{loginStatus}</h1>
        </>
      )}
    </>
  );
};

export default Login;
