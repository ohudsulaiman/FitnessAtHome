import React from "react";
import { getCookie, eraseCookie } from "./helpers";
import { Link, NavLink } from "react-router-dom";
class Header extends React.Component {
  render() {
    const loginNve = () => {
      if (getCookie("tokon")) {
        return (
          <li>
            <Link to="/signup" className="smoothScroll" onClick={RemveTokon}>
              Log out
            </Link>
          </li>
        );
      } else {
        return (
          <li>
            <Link to="../#login" className="smoothScroll">
              Log in
            </Link>
          </li>
        );
      }
    };
    const RemveTokon = (e) => {
      e.preventDefault();
      eraseCookie("tokon");
      this.props.history.push("/#login");
    };

    return (
      <header>
        <div className="navWrapper" id="home">
          <div className=" clearfix">
            <NavLink to="/StaffLogin">
              <h2 className="companyName">FitnessAtHome</h2>{" "}
            </NavLink>
            <nav className="mainNav clearfix">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/exericse" className="smoothScroll">
                    Exericse
                  </NavLink>
                </li>
                <li>
                  <NavLink to="../#contact" className="smoothScroll">
                    Contact
                  </NavLink>
                </li>
                {loginNve()}
              </ul>
            </nav>
          </div>
        </div>
        <section className="hero">
          <div className="innerWrapper">
            <h1>Practise anytime,</h1>
            <h3>anywhere... </h3>
          </div>
        </section>
      </header>
    );
  }
}
export default Header;
