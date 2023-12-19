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
  const { increaseCartQuantity } = useShoppingCart();

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
        </Col>
      </Row>
    </Card>
  );
}
