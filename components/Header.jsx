import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navBar ">
      <Link to="/">
        <div className="menuItem">Home</div>
      </Link>
      <Link to="/weather">
        <div className="menuItem">Weather Forcast</div>
      </Link>
      <Link to="/googlebooks">
        <div className="menuItem">Google Books</div>
      </Link>
    </div>
  );
}
