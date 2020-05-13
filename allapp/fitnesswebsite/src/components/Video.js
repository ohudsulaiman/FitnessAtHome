import React from "react";
import Data from "./Data";
const Video = (props) => {
  const list = props.datavideo.map((item) => {
    return <Data key={item.link} item={item} />;
  });
  return (
    <>
      <section className="AllvideoSection">{list}</section>
    </>
  );
};

export default Video;
