import PropTypes from "prop-types";
const LoginForm = ({
  submitHandler,
  username,
  setUsername,
  password,
  setPassword
}) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        Username:
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
LoginForm.prototypes = {
  submitHandler: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default LoginForm;
