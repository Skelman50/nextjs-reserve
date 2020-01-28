import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import SignUpForm from "../components/shared/AuthForm";
import BottomMessage from "../components/shared/BottomMessage";
import { Message } from "semantic-ui-react";
import { catchErrors } from "../utils/catchErrors";
import { baseURL } from "../utils/baseUrl";
import { handleLogin } from "../utils/auth";

const INITIAL_USER = {
  email: "",
  password: ""
};

function Login() {
  const [user, setUser] = useState(INITIAL_USER);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      const url = `${baseURL}/login`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data.token);
      setUser(INITIAL_USER);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Fragment>
      <Message
        attached
        icon="privacy"
        header="Welcome back!"
        content="Log In With email and password"
        color="blue"
      />
      <SignUpForm
        handleChange={handleChange}
        user={user}
        disabled={disabled}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
        type="login"
      />
      <BottomMessage type="login" />
    </Fragment>
  );
}

export default Login;
