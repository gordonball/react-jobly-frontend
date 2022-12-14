import { NavLink } from "react-router-dom";
import userContext from "./userContext";
import { useContext } from "react";

/**
 * Renders the navbar.
 *
 * Props: logout (function)
 * State:
 *  - currentUser - if no current user = null, if current user = object;
 *    ex. {userDetails: {applications, email, firstName, isAdmin,
 *    lastName, username}, isLoading: {boolean}}
 *  - isLoggedIn - boolean
 *
 * App -> NavBar
 */

function NavBar({ logout }) {
  const { userDetails, loggedInStatus } = useContext(userContext);
  console.log(userDetails, "userDetails in NavBar");
  console.log(loggedInStatus, "isLoggedIn in NavBar");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid">
        <NavLink className="navbar-brand px-2" to="/">
          Jobly
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            {loggedInStatus && (
              <NavLink className="nav-link" to="/companies">
                Companies
              </NavLink>
            )}
            {loggedInStatus && (
              <NavLink className="nav-link" to="/jobs">
                Jobs
              </NavLink>
            )}
            {!loggedInStatus && (
              <NavLink className="nav-link" to="/signup">
                Signup
              </NavLink>
            )}
            {!loggedInStatus && (
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            )}
            {loggedInStatus && (
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            )}
            {loggedInStatus && (
              <NavLink onClick={logout} className="nav-link" to="/">
                Logout {userDetails.firstName}
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
