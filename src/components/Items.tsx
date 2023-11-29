import { Card, Image, Row, Col, Button } from "antd";
import { useShoppingCart } from "../context/ShoppingCartContext";

type ItemsProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  category: string;
};

export function MyItems({ id, name, price, imgUrl }: ItemsProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);

  return (
    <Card
      cover={
        <Image
          src={imgUrl}
          style={{
            height: "200px",
            objectFit: "cover",
          }}
        />
      }
    >
      <Row gutter={[8, 8]} justify={"space-between"}>
        <Col>{name}</Col>
        <Col>{price}</Col>
        <Col span={24}>
          <Button
            onClick={() => increaseCartQuantity(id)}
            style={{
              width: "100%",
            }}
          >
            Add Item
          </Button>

          <div>
            {/* <Row
                justify={"center"}
                style={{
                  textAlign: "center",
                }}
              >
                <Col span={8}>
                  <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                </Col>
                <Col span={8}>{quantity}</Col>
                <Col span={8}>
                  <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                </Col>
                <Col span={24}>
                  <Button onClick={() => removeFromCart(id)}>
                    Remove from cart
                  </Button>
                </Col>
              </Row> */}
          </div>
        </Col>
      </Row>
    </Card>
  );
}
