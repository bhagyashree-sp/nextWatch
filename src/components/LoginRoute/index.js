import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";
import context from "../../context/context";

const LoginRoute = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [dispPassword, setDispPassword] = useState(false);
  const navigate = useNavigate();
  const { dark } = useContext(context);

  const dispType = dispPassword ? "text" : "password";

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onClickCheckBox = (event) => {
    setDispPassword(event.target.checked);
  };

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    navigate("/", { replace: true });
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    console.log("submit");
    const url = "https://apis.ccbp.in/login";
    const details = { username: name, password };
    console.log(details);
    const options = {
      method: "POST",
      body: JSON.stringify(details),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token);
    } else {
      setErrorMsg(data.error_msg);
    }
  };

  const jwtToken = Cookies.get("jwt_token");

  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className={dark ? "main-container main-container-dark" : "main-container"}
    >
      <div
        className={
          dark ? "login-container login-container-dark" : "login-container"
        }
      >
        <img
          src={
            dark
              ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
              : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          }
          alt="logo"
          className="logo"
        />
        <form onSubmit={onSubmitForm}>
          <div className="form-group">
            <label
              htmlFor="Username"
              className={dark ? "label label-dark" : "label"}
            >
              USERNAME
            </label>
            <input
              id="Username"
              type="text"
              className="input-field"
              placeholder="Username"
              onChange={onChangeName}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="Password"
              className={dark ? "label label-dark" : "label"}
            >
              PASSWORD
            </label>
            <input
              type={dispType}
              className="input-field"
              placeholder="Password"
              id="Password"
              onChange={onChangePassword}
            />
          </div>
          <div className="show-password-group">
            <input
              type="checkbox"
              id="showPassword"
              value={dispPassword}
              className="show-password-checkbox"
              onChange={onClickCheckBox}
            />
            <label
              htmlFor="showPassword"
              className={
                dark
                  ? "show-password-label show-password-label-dark"
                  : "show-password-label"
              }
            >
              Show Password
            </label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {errorMsg.length !== "" && <p>{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginRoute;
