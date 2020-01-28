import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message
} from "semantic-ui-react";

const CreateForm = ({
  product,
  handleChange,
  handleSubmit,
  success,
  mediaPreview,
  loading,
  disabled,
  error
}) => {
  return (
    <Form
      success={success}
      onSubmit={handleSubmit}
      loading={loading}
      error={Boolean(error)}
    >
      <Message error header="Ooops!" content={error} />
      <Message
        success
        icon="check"
        header="Success!"
        content="Your product has been posted"
      />
      <Form.Group widths="equal">
        <Form.Field
          control={Input}
          name="name"
          label="Name"
          placeholder="Name"
          type="text"
          onChange={handleChange}
          value={product.name}
        />
        <Form.Field
          control={Input}
          name="price"
          label="Price"
          placeholder="Price"
          type="number"
          min="0.00"
          step="0.01"
          onChange={handleChange}
          value={product.price}
        />
        <Form.Field
          control={Input}
          name="media"
          label="Media"
          type="file"
          accept="image/*"
          content="Select image"
          onChange={handleChange}
        />
      </Form.Group>
      <Image src={mediaPreview} alt="" rounded centered size="small" />
      <Form.Field
        control={TextArea}
        name="description"
        label="Description"
        placeholder="Description"
        type="text"
        onChange={handleChange}
        value={product.description}
      />
      <Form.Field
        control={Button}
        loading={loading}
        disabled={loading || disabled}
        color="blue"
        icon="pencil alternate"
        content="Submit"
        type="submit"
        onChange={handleChange}
      />
    </Form>
  );
};

export default CreateForm;
