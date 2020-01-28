import { Header, Icon } from "semantic-ui-react";

const CreateHeader = () => {
  return (
    <Header as="h2" block>
      <Icon name="add" color="orange" />
      Create a new product
    </Header>
  );
};

export default CreateHeader;
