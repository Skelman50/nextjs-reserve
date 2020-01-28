import { Label, List, Image } from "semantic-ui-react";
import { Fragment } from "react";
import { formatDate } from "./formatDate";

export const accordionPanel = order => ({
  key: order._id,
  title: {
    content: <Label color="blue" content={formatDate(order.createdAt)} />
  },
  content: {
    content: (
      <Fragment>
        <List.Header as="h3">
          Total: ${order.total}
          <Label
            content={order.email}
            icon="mail"
            basic
            horizontal
            style={{ marginLeft: "1em" }}
          />
        </List.Header>
        <List>
          {order.products.map(product => (
            <List.Item key={product.product._id}>
              <Image avatar src={product.product.mediaUrl} />
              <List.Content>
                <List.Header>{product.product.name}</List.Header>
                <List.Description>
                  {product.quantity} - ${product.product.price}
                </List.Description>
              </List.Content>
              <List.Content floated="right">
                <Label tag color="red" size="tiny">
                  {product.product.sku}
                </Label>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Fragment>
    )
  }
});
