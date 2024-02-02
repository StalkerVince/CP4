import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <p>
        Welcome to DriveBase, the smallest car database managed by the users!
        <br />
        Signup and share the cars you found or research the ones you want!
      </p>
      <button type="button">
        <Link to="/data/search">Search for a Car</Link>
      </button>
    </>
  );
}

export default Home;
