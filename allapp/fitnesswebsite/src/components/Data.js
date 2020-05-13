import React from "react";
import { withRouter } from "react-router-dom";
const Data = (props) => {
  return (
    <section className="videoSection">
      <div className="vidcontainer">
        <div className="flip3D">
          <div className="back">
            <div className="container">
              <embed
                className="video"
                width="340"
                height="300"
                src={props.item.link}
              />
            </div>
          </div>
          <div className="front">
            <h5>Start</h5>
          </div>
        </div>
      </div>
    </section>
  );
};
export default withRouter(Data);
