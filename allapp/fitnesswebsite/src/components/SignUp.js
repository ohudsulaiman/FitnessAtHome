import React from "react";
import { Link } from "react-router-dom";
class SginUp extends React.Component {
  render() {
    const handledRegister = (event) => {
      event.preventDefault();
      var Name = event.target.querySelector("#Name").value;
      var Email = event.target.querySelector("#Email").value;
      var Password = event.target.querySelector("#password").value;
      var phone = event.target.querySelector("#PNumber").value;
      const register = (name, email, Passward, phone) => {
        return fetch("http://localhost:5000/register", {
          method: "post",
          headers: {
            "content-type": `application/json`,
          },
          body: JSON.stringify({
            name,
            email,
            Passward,
            phone,
          }),
        })
          .then((res) => {
            if (!res.ok) {
              throw res;
            }
            return res;
          })
          .then((res) => {
            console.log(res);
            this.props.history.push("/#login");
          })
          .catch((e) => {
            if (e.status === 401) {
              alert("you not have the ablty of single in by this email");
            }
            if (e.status === 400) {
              alert("your email it's all redy single in or phone number ");
            }
          });
      };
      register(Name, Email, Password, phone);
    };
    return (
      <>
        <form className="SginUpSection" onSubmit={handledRegister}>
          <div className="container">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr></hr>
            <label for="Name">
              <b>Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name="text"
              id="Name"
              required
            />
            <label for="email">
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              id="Email"
              required
            />
            <label for="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              id="password"
              minlength="8"
              required
            />
            <label for="psw-repeat">
              <b>Repeat Password</b>
            </label>
            <input
              type="password"
              placeholder="Repeat Password"
              name="psw-repeat"
              minlength="8"
              required
            />
            <label for="psw-repeat">
              <b>Phone Number</b>
            </label>
            <input
              type="number"
              placeholder="Repeat Password"
              name="psw-repeat"
              id="PNumber"
              minlength="10"
              maxLength="13"
              required
            />
            <hr></hr>

            <button type="submit" className="registerbtn">
              Register
            </button>
          </div>
          <div className="container signin">
            <p>
              Already have an account? <Link to="../#login">Sign in</Link>.
            </p>
          </div>
        </form>
      </>
    );
  }
}
export default SginUp;
