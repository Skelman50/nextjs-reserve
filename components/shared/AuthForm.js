import { Form, Segment, Button, Message } from "semantic-ui-react";

const SignUpForm = ({
  handleChange,
  user,
  disabled,
  handleSubmit,
  loading,
  error,
  type
}) => {
  return (
    <Form onSubmit={handleSubmit} loading={loading} error={Boolean(error)}>
      <Message error header="Ooops" content={error} />
      <Segment>
        {type === "signup" && (
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={user.name}
          />
        )}
        <Form.Input
          fluid
          icon="envelope"
          iconPosition="left"
          label="Email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={user.email}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
          value={user.password}
        />
        <Button
          icon={type === "signup" ? "signup" : "sign in"}
          type="submit"
          color="orange"
          content={type === "signup" ? "Signup" : "Login"}
          disabled={disabled || loading}
        />
      </Segment>
    </Form>
  );
};

export default SignUpForm;
