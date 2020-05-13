import React from "react";
import Header from "../components/Header";
import * as token from "../components/helpers";
import { Link } from "react-router-dom";
class EXercisePage extends React.Component {
  render() {
    const items = [
      { title: "arms", image: "card card--1" },
      { title: "back", image: "card card--2" },
      { title: "shoulder", image: "card card--3" },
      { title: "core", image: "card card--4" },
      { title: "chest", image: "card card--5" },
      { title: "legs", image: "card card--6" },
    ];
    if (!token.getCookie("tokon")) {
      return (
        <div>
          <h1>pless login</h1>
        </div>
      );
    }
    return (
      <>
        <Header {...this.props} />
        <section className="exerciseCard">
          <section className="cards">
            {items.map((item) => (
              <article className={item.image}>
                <div className="card__info-hover"></div>
                <div className="card__img">/></div>
                <Link to={`/video/${item.title}`} className="card_link">
                  <div className="card__img--hover"></div>
                </Link>
                <div className="card__info">
                  <span className="card__category"> Exercise </span>
                  <h3 className="card__title">{item.title}</h3>
                </div>
              </article>
            ))}
          </section>
        </section>
      </>
    );
  }
}
export default EXercisePage;
