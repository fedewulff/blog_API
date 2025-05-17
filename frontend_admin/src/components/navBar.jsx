import { useState } from "react";
import { NavLink } from "react-router";
import "../css/profile.css";

function NavBar({ eraseAccessToken, showFormFunction }) {
  const [error, setError] = useState(``);

  async function logOut() {
    eraseAccessToken("logout");

    try {
      await fetch("http://localhost:9000/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      //navigate("/");
    } catch (error) {
      setError(error);
    }
  }

  if (error) {
    return <div>Couldn't fetch API</div>;
  }

  return (
    <div className="navBar">
      <div className="homeAndNewPostButtons">
        <NavLink to="/admin-profile" className="navBarButton">
          HOME
        </NavLink>

        <button onClick={showFormFunction} className="navBarButton">
          NEW POST
        </button>
      </div>
      <button onClick={logOut} className="navBarButton">
        LOG OUT
      </button>
    </div>
  );
}

export default NavBar;
