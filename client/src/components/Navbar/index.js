import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <Link className="navbar-brand" to="/">
        Home
      </Link>
    </nav>
  );
}

export default Navbar;
