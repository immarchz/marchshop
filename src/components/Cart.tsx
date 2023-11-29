import { Col, Drawer, Radio, Row } from "antd";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import Items from "../data/items.json";
import { useState } from "react";

type ShoppingCartProps = {
  isOpen: boolean;
};

const Cart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart();
  const [fixed, setFixed] = useState("");

  const handleRadioChange = (e) => {
    setFixed(e.target.value);
  };
  console.log(fixed);

  return (
    <Drawer width={500} title="Shopping Cart" open={isOpen} onClose={closeCart}>
      <Row>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
        <Col
          span={24}
          style={{
            fontWeight: "bold",
            fontSize: "5",
            marginTop: "8px",
          }}
        >
          <Col>Discounted</Col>
          <Radio.Group onChange={handleRadioChange}>
            <Radio value={"fixed"}></Radio>
          </Radio.Group>
        </Col>

        <Col
          span={24}
          style={{
            fontWeight: "bold",
            fontSize: "5",
            marginTop: "8px",
            textAlign: "end",
          }}
        >
          Total : {"   "}
          {cartItems.reduce((total, CartItem) => {
            const item = Items.find((i) => i.id === CartItem.id);
            if (fixed === "fixed") {
              return total + (item?.price || 0) * CartItem.quantity - 4;
            } else {
              return total + (item?.price || 0) * CartItem.quantity;
            }
          }, 0)}
          $
        </Col>
      </Row>
    </Drawer>
  );
};

export default Cart;
