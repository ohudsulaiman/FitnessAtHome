import React from "react";
import Header from "../components/Header";
import * as jwt from "jsonwebtoken";
import { getCookie } from "../components/helpers";
class AddTraining extends React.Component {
  render() {
    const addTraningFuncaton = (e) => {
      e.preventDefault();
      var link = e.target.querySelector("#link").value;
      var type = e.target.querySelector("#type").value;
      var author = e.target.querySelector("#author").value;
      const addTraning = (link, type, author) => {
        return fetch("http://localhost:5000/addTraning", {
          method: "post",
          headers: {
            authorization: getCookie("tokon"),
            "content-type": `application/json`,
          },
          body: JSON.stringify({
            link,
            type,
            author,
          }),
        })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            }
            throw new Error(String(res));
          })
          .catch((e) => alert(e));
      };
      addTraning(link, type, author);
    };
    const ShowFrom = () => {
      var User_info = jwt.decode(getCookie("tokon"));
      if (User_info.e.split("@")[1].split(".")[0] === "FitnessAtHome") {
        return (
          <form
            action="action_page.php"
            className="AddTrainingSection"
            onSubmit={addTraningFuncaton}
          >
            <div className="container">
              <label for="addtraningCard">
                <b>Add new traning</b>
              </label>
              <input
                type="text"
                placeholder="Link"
                name="link"
                required
                id="link"
              />
              <input
                type="text"
                placeholder="Type"
                name="type"
                required
                id="type"
              />

              <input
                type="text"
                placeholder="Author"
                name="author"
                required
                id="author"
              />

              <button type="submit" className="registerbtn">
                Add
              </button>
            </div>
          </form>
        );
      }
    };

    return (
      <>
        <Header {...this.props} />
        {ShowFrom()}
      </>
    );
  }
}
export default AddTraining;
