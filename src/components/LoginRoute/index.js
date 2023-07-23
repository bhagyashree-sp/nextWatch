import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const LoginRoute = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [dispPassword, setDispPassword] = useState(false);
  const navigate = useNavigate();

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

  return (
    <div className="main-container">
      <div className="login-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="logo"
          className="logo"
        />
        <form onSubmit={onSubmitForm}>
          <div className="form-group">
            <label htmlFor="Username">USERNAME</label>
            <input
              id="Username"
              type="text"
              className="input-field"
              placeholder="Username"
              onChange={onChangeName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password">PASSWORD</label>
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
            <label htmlFor="showPassword" className="show-password-label">
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
