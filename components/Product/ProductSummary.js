import { Item, Label, Input } from "semantic-ui-react";
import { useRouter } from "next/router";

function ProductSummary({
  name,
  mediaUrl,
  price,
  sku,
  quantity,
  handleChangeQuantity,
  user,
  handleAddProductToCart,
  success,
  loading
}) {
  const router = useRouter();
  const actionOptions = () => {
    if (success && user) {
      return {
        color: "blue",
        content: "Item added!",
        icon: "plus cart",
        disabled: true
      };
    }
    if (!success && user) {
      return {
        color: "orange",
        content: "Add to Cart",
        icon: "plus cart",
        loading,
        disabled: loading,
        onClick: () => handleAddProductToCart()
      };
    }
    if (!user) {
      return {
        color: "blue",
        content: "Sign up to purchase",
        icon: "signup",
        onClick: () => router.push("/signup")
      };
    }
  };

  return (
    <Item.Group>
      <Item>
        <Item.Image size="medium" src={mediaUrl} />
        <Item.Content>
          <Item.Header>{name}</Item.Header>
          <Item.Description>
            <p>${price}</p>
            <Label>SKU: {sku}</Label>
          </Item.Description>
          <Item.Extra>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={handleChangeQuantity}
              placeholder="Quantity"
              action={actionOptions()}
            />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default ProductSummary;
