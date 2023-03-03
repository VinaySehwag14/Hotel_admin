import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../backend";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${API}/auth/login`, credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          'linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.4)), url("https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60") center',
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="type freewolf"
        id="username"
        onChange={handleChange}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="type freewolf"
        id="password"
        onChange={handleChange}
      />
      <button
        disabled={loading}
        onClick={handleClick}
        style={{
          padding: 10,
          width: 100,
          backgroundColor: "grey",
          border: "none",
          cursor: "pointer",
        }}
      >
        Login
      </button>
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default Login;
