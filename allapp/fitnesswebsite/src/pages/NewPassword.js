import React from "react";
import Header from "../components/Header";
class ForgetPassword extends React.Component {
  render() {
    const ResatPassWord = (e) => {
      e.preventDefault();
      var Passward = e.target.querySelector("#NewPassword").value;
      var NPC = e.target.querySelector("#NewPasswordC").value;
      if (Passward === NPC) {
        return fetch("http://localhost:5000/reset", {
          method: "PUT",
          headers: {
            "content-type": `application/json`,
            authorization: this.props.match.params.id,
          },
          body: JSON.stringify({
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
            alert(res);
          })
          .catch((e) => {
            if (e.status === 401) {
              alert("some thing error check youre email");
            }
          });
      } else {
        e.target.querySelector("#NewPassword").value = " ";
        e.target.querySelector("#NewPasswordC").value = " ";
        alert("The New Password not same confirm new Password");
      }
    };
    return (
      <>
        <Header {...this.props} />
        <form
          action="action_page.php"
          className="SginUpSection"
          onSubmit={ResatPassWord}
        >
          <div className="container">
            <label for="psw">
              <b> new Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              id="NewPassword"
              required
            />
            <label for="psw-repeat">
              <b> confirm new Password</b>
            </label>
            <input
              type="password"
              placeholder="Repeat Password"
              name="psw-repeat"
              id="NewPasswordC"
              required
            />
            <button type="submit" className="registerbtn">
              Reset password
            </button>
            <hr></hr>
          </div>
        </form>
      </>
    );
  }
}
export default ForgetPassword;
