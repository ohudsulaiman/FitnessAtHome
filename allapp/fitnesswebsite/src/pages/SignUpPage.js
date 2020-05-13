import React from "react";
import SignUp from "../components/SignUp";
import Header from "../components/Header";

class SignUpPage extends React.Component {
  render() {
    return (
      <>
        <Header {...this.props} />
        <SignUp {...this.props} />
      </>
    );
  }
}
export default SignUpPage;
