import React from "react";
import { setCookie } from "./helpers";
import { Link } from "react-router-dom";
class Login extends React.Component {
  render() {
    const LoginFuncation = (event) => {
      event.preventDefault();
      var username = event.target.querySelector("#Username").value;
      var Password = event.target.querySelector("#Password").value;
      const login = (email, Passward) => {
        return fetch("http://localhost:5000/login", {
          method: "post",
          headers: {
            "content-type": `application/json`,
          },
          body: JSON.stringify({
            email,
            Passward,
          }),
        })
          .then((res) => {
            if (!res.ok) {
              throw res;
            }
            return res.json();
          })
          .then((res) => {
            setCookie("tokon", res, 603000);
            this.props.history.push("/exericse");
          })
          .catch((e) => {
            if (e.status === 401) {
              alert("your enter password or email not true ");
            }
          });
      };
      login(username, Password);
    };

    return (
      <>
        <div className="Loginsection" id="login">
          <div className="main">
            <p className="sign" align="center">
              Log in
            </p>

            <form className="form1" onSubmit={LoginFuncation}>
              <input
                className="un "
                type="text"
                align="center"
                placeholder="Email"
                id="Username"
              />
              <input
                className="pass"
                type="password"
                align="center"
                placeholder="Password"
                id="Password"
              />
              <button className="submit" align="center">
                Log in
              </button>
              <p className="forgot" align="center">
                <Link to="/forget">Forgot Password? </Link>
                OR
                <div id="dont_have_an_account">
                  <p>
                    Need to{" "}
                    <Link to="/signup" class="login_link">
                      sign up
                    </Link>{" "}
                    for an account
                  </p>
                </div>
              </p>
            </form>
          </div>
        </div>
      </>
    );
  }
}
export default Login;
