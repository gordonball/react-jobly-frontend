import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RoutesList from "./RoutesList";
import NavBar from "./NavBar";
import userContext from "./userContext";
import JoblyApi from "./api";
import jwt_decode from "jwt-decode";

/**
 * This app component displays a website that allows users to navigate through
 * companies and job listings.
 *
 * Props - none
 * State - none
 *
 * App -> NavBar, RoutesList
 */

function App() {

  let initialUser = { userDetails: null, isLoading: true };

  const [token, setToken] = useState({ data: null, error: null });
  const [currentUser, setCurrentUser] = useState(initialUser);

  console.log(currentUser, "currentUser");
  console.log(token, "token");

  useEffect(function updateUserDataWhenTokenChanges() {
    if (token.data) {
      const decodedToken = jwt_decode(token.data);
      const { username } = decodedToken;
      async function updateUser() {
        const user = await JoblyApi.getUserDetails(username);
        setCurrentUser({ userDetails: user, isLoading: false, errors: null });
      }
      updateUser();
    }
  }, [token]);

  async function loginUser({ username, password }) {
    const token = await JoblyApi.authenticateLoginAndGetToken({
      username,
      password,
    });
    setToken({ data: token, err: null });
  }

  async function signUpUser({
    username,
    password,
    firstName,
    lastName,
    email,
  }) {
    try {
      const tokenData = await JoblyApi.authenticateSignUpAndGetToken({
        username,
        password,
        firstName,
        lastName,
        email,
      });
      setToken({ data: token, err: null });
    } catch (err) {
      setToken({ data: null, err });
    }
  }

  function logoutUser() {
    setToken(null);
    setCurrentUser(initialUser);
  }

  return (
    <userContext.Provider value={{ currentUser: currentUser.userDetails, token }}>
      <div className="App container-fluid">
        <BrowserRouter>
          <NavBar logout={logoutUser} />
          <RoutesList login={loginUser} signUp={signUpUser} />
        </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;
