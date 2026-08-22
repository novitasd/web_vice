import { Link } from "react-router-dom";
import "./Logo.css";

function Logo() {
  return (
    <Link to="/" className="logo">
      <div className="logo-brand">
        <span className="logo-top">TIO</span>
        <span className="logo-bottom">URBAN</span>
      </div>
    </Link>
  );
}

export default Logo;