import React from "react";
import Header from "../components/Header";

class StaffPage extends React.Component {
  render() {
    return (
      <>
        <Header {...this.props} />
        <div className="Loginsection" id="login">
          <div className="main">
            <p className="sign" align="center">
              Log in
            </p>
            <form className="form1">
              <input
                className="un "
                type="text"
                align="center"
                placeholder="Username"
                id="Username"
              />
              <input
                className="pass"
                type="password"
                align="center"
                placeholder="Password"
                id="Password"
              />
              <a href="/addtraning" className="submit" align="center">
                Log in
              </a>
              <p className="forgot" align="center">
                <a href="/foget">Forgot Password? </a>
                OR
                <div id="dont_have_an_account">
                  <p>
                    Need to{" "}
                    <a href="/Signup" className="login_link">
                      sign up
                    </a>{" "}
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
export default StaffPage;
