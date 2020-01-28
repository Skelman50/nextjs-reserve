import { Fragment, useState } from "react";
import { Header, Button, Modal } from "semantic-ui-react";
import axios from "axios";
import { useRouter } from "next/router";
import { baseURL } from "../../utils/baseUrl";

function ProductAttributes({ description, _id, user }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const adminOrRoot = user && (user.role === "admin" || user.role === "root");

  const handleDelete = async () => {
    try {
      setLoading(true);
      const url = `${baseURL}/product`;
      const payload = { params: { _id } };
      await axios.delete(url, payload);
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Header as="h3">About this product</Header>
      <p>{description}</p>
      {adminOrRoot && (
        <Fragment>
          <Button
            icon="trash alternate outline"
            color="red"
            content="Delete Product"
            onClick={() => setOpen(true)}
          />
          <Modal open={open} dimmer="blurring" loading={loading}>
            <Modal.Header>Confirm Delete</Modal.Header>
            <Modal.Content>
              <p>Are you sure want to delete this product?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button content="Cancel" onClick={() => setOpen(false)} />
              <Button
                negative
                icon="trash"
                labelPosition="right"
                content="Delete"
                onClick={handleDelete}
                loading={loading}
                disabled={loading}
              />
            </Modal.Actions>
          </Modal>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductAttributes;
