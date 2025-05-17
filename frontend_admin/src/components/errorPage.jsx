import { NavLink } from "react-router";
import "../css/login-signup-error.css";

const ErrorPage = () => {
  return (
    <div className="errorPage">
      <h1>Oh no, this route doesn't exist!</h1>
      <NavLink to="/" className="backToLogin">
        Go back!
      </NavLink>
    </div>
  );
};

export default ErrorPage;
