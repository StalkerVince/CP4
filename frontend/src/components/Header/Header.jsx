import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <button type="button">
        <Link to="/signup">Sign Up</Link>
      </button>
      <h1>
        <a href="/">DRIVEBASE</a>
      </h1>
      <button type="button">
        <Link to="/login">Log In</Link>
      </button>
    </header>
  );
}

export default Header;
