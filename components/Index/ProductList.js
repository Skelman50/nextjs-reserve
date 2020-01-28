import { Card } from "semantic-ui-react";
import Link from "next/link";

function ProductList({ products }) {
  const mapProductsToItems = products => {
    return products.map(product => (
      <Card
        href={`/product?_id=${product._id}`}
        key={product._id}
        meta={`$${product.price}`}
        image={product.mediaUrl}
        fluid
        color="teal"
        header={product.name}
      />
    ));
  };

  return (
    <Card.Group itemsPerRow="3" centered stackable>
      {mapProductsToItems(products)}
    </Card.Group>
  );
}

export default ProductList;
