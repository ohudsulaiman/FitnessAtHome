import React from "react";
import Login from "../components/Login";
import ContactUs from "../components/ContactUs";
import { getCookie } from "../components/helpers";
import Header from "../components/Header";
class HomePage extends React.Component {
  render() {
    const showLogin = () => {
      if (!getCookie("tokon")) {
        return <Login {...this.props} />;
      }
    };
    return (
      <>
        <Header {...this.props} />
        {showLogin()}
        <ContactUs />
      </>
    );
  }
}
export default HomePage;
