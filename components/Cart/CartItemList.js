import {
  Segment,
  Header,
  Icon,
  Button,
  Item,
  Message
} from "semantic-ui-react";
import { useRouter } from "next/router";

function CartItemList({ user, products = [], handleRemoveProduct, success }) {
  const router = useRouter();
  const mapCartToProps = products => {
    return products.map(p => ({
      childKey: p.product._id,
      header: (
        <Item.Header
          as="a"
          onClick={() => router.push(`/product?_id=${p.product._id}`)}
        >
          {p.product.name}
        </Item.Header>
      ),
      image: p.product.mediaUrl,
      meta: `${p.quantity} x $${p.product.price}`,
      fluid: "true",
      extra: (
        <Button
          basic
          icon="remove"
          floated="right"
          onClick={() => handleRemoveProduct(p.product._id)}
        />
      )
    }));
  };
  if (success) {
    return (
      <Message
        success
        header="Success"
        content="Your order and payment has been accepted"
        icon="start outline"
      />
    );
  }
  if (!products.length) {
    return (
      <Segment secondary color="teal" inverted textAlign="center" placeholder>
        <Header icon>
          <Icon name="shopping basket" />
          No products in yor cart. Add some!
        </Header>
        {user && (
          <div>
            {" "}
            <Button color="orange" onClick={() => router.push("/")}>
              View Products
            </Button>
          </div>
        )}
        {!user && (
          <div>
            {" "}
            <Button color="blue" onClick={() => router.push("/login")}>
              Login to add products
            </Button>
          </div>
        )}
      </Segment>
    );
  }
  return <Item.Group divided items={mapCartToProps(products)} />;
}

export default CartItemList;
