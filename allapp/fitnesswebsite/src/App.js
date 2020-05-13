import React from "react";
import HomePage from "../src/pages/HomePage";
import SignUpPage from "../src/pages/SignUpPage";
import Footer from "../src/components/Footer";
import ExercisePage from "../src/pages/ExerciesPage";
import VideoPage from "./style/VideoPage";
import ForgetPassword from "../src/pages/ForgetPasswordPage";
import NewPassword from "../src/pages/NewPassword";
import StaffPage from "../src/pages/StaffPage";
import AddTraining from "../src/pages/AddTranings";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.scss";
import * as jwt from "jsonwebtoken";
import { getCookie } from "./components/helpers";
import data from "./data/videos.json";
function App(props) {
  const datavideo = data;
  return (
    <BrowserRouter>
      <div className="wrapper">
        <div className="container">
          <>
            <Route
              exact
              path="/"
              render={(props) => {
                return <HomePage {...props} />;
              }}
            />
            <Route
              exact
              path="/forget"
              render={(props) => {
                if (!getCookie("tokon")) {
                  return <ForgetPassword {...props} />;
                }
                props.history.push("/exericse");
              }}
            />
            <Route
              exact
              path="/newPass/:id"
              render={(props) => {
                if (!getCookie("tokon")) {
                  return <NewPassword {...props} />;
                }
                props.history.push("/exericse");
              }}
            />
            <Route
              exact
              path="/StaffLogin"
              render={(props) => {
                return <StaffPage />;
              }}
            />
            <Route
              path="/addtraning"
              render={(props) => {
                if (getCookie("tokon")) {
                  var User_info = jwt.decode(getCookie("tokon"));
                  if (
                    User_info.e.split("@")[1].split(".")[0] === "FitnessAtHome"
                  ) {
                    return <AddTraining {...props} />;
                  }
                  alert("you not have the ablity to enter ");
                }
                props.history.push("/");
              }}
            />

            <Route
              exact
              path="/signup"
              render={(props) => {
                if (!getCookie("tokon")) {
                  return <SignUpPage {...props} />;
                }
                props.history.push("/exericse");
              }}
            />
            <Route
              exact
              path="/exericse"
              render={(props) => {
                if (getCookie("tokon")) {
                  return <ExercisePage {...props} />;
                }
                props.history.push("/#login");
                window.alert("please login we want help you");
              }}
            />
            <Route
              exact
              to
              path="/video/:type"
              render={(props) => {
                return <VideoPage {...props} datavideo={datavideo} />;
              }}
            />
          </>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
