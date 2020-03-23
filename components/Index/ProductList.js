import { Card, Header } from "semantic-ui-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ProductList({ products }) {
  const mapProductsToItems = products => {
    return products.map(product => (
      <Card
        href={`/product?_id=${product._id}`}
        key={product._id}
        fluid
        color="teal"
      >
        <Header>{product.name}</Header>
        <LazyLoadImage
          alt=""
          effect="blur"
          src={product.mediaUrl}
          width={180}
        />
        <div>{`$${product.price}`}</div>
      </Card>
    ));
  };

  return (
    <Card.Group itemsPerRow="3" centered stackable>
      {mapProductsToItems(products)}
    </Card.Group>
  );
}

export default ProductList;
