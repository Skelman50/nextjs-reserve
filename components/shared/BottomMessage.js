import Link from "next/link";
import { Message, Icon } from "semantic-ui-react";

const BottomMessage = ({ type }) => {
  const href = type === "signup" ? "/login" : "/signup";
  const header = type === "signup" ? "Existing user?" : "New User?";
  const linkText = type === "signup" ? "Log in here" : "Signup here";
  return (
    <Message attached="bottom" warning>
      <Icon name="help" /> {header}{" "}
      <Link href={href}>
        <a>{linkText}</a>
      </Link>{" "}
      instead.
    </Message>
  );
};

export default BottomMessage;
