import { Button, Col, Divider, Image, Row } from "antd";
import { useShoppingCart } from "../context/ShoppingCartContext";
import Items from "../data/items.json";
type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();
  const item = Items.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <>
      <Row gutter={[8, 8]} justify={"center"}>
        <Col>
          <Image
            src={item.imgUrl}
            style={{
              width: "125px",
              height: "125px",
              objectFit: "cover",
            }}
          />
        </Col>

        <Col>
          <Col
            style={{
              fontWeight: "bold",
              fontSize: "5",
              marginTop: "8px",
            }}
          >
            {item.name}
          </Col>
          <Col span={24}>{item.price} $ </Col>
          <Col>Total Price: {item.price * quantity} $</Col>
          <Col>
            <Button
              danger
              style={{
                marginTop: "10px",
              }}
              onClick={() => removeFromCart(item.id)}
            >
              Delete from Cart
            </Button>
          </Col>
        </Col>
        <Col>
          <Col>
            {quantity > 0 && (
              <span
                style={{
                  color: "gray",
                }}
              >
                Amount : {quantity}
              </span>
            )}
            <Col>
              <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
              <Button onClick={() => increaseCartQuantity(id)}>+</Button>
            </Col>
          </Col>
        </Col>
      </Row>

      <Divider />
    </>
  );
};

export default CartItem;
