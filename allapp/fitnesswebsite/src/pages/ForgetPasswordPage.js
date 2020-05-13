import React from "react";
import Header from "../components/Header";

class ForgetPassword extends React.Component {
  render() {
    const SendEmail = (e) => {
      var email = e.target.querySelector("#email").value;
      return fetch("http://localhost:5000/forget", {
        method: "post",
        headers: {
          "content-type": `application/json`,
        },
        body: JSON.stringify({
          email,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .catch((e) => {
          if (e.status === 401) {
            alert("the email not found ");
          }
        });
    };
    return (
      <>
        <Header {...this.props} />
        <form
          action="action_page.php"
          className="SginUpSection"
          onSubmit={SendEmail}
        >
          <div className="container">
            <p>Please enter your username or emaill address.</p>
            <hr></hr>
            <label for="email">
              <b> Username or Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              id="email"
              required
            />
            <button type="submit" className="registerbtn">
              Get new password
            </button>
          </div>
        </form>
      </>
    );
  }
}
export default ForgetPassword;
