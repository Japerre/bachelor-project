import { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {

  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [token, setToken] = useState("");

  

  axios.defaults.withCredentials = true; // weet niet wat dit doet

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
        setLoginStatus("")
        localStorage.setItem("token", "Bearer " + response.data.jwt);
        setToken(response.data.jwt);
        window.location.reload(false) // alles eens herladen 
      });
  };

  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <h1>succesfully signed in as</h1>
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
