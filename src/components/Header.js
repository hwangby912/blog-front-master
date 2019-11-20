import React from "react";
import sunShine from "../static/image/sun_shine.jpg";

export default function Header() {
  return (
    <header
      className="masthead"
      style={{ backgroundImage: `url(${sunShine})` }}
    >
      <div className="overlay" />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="site-heading">
              <h1>My Future is</h1>
              <span className="subheading">Full Stack Developer</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
