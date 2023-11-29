import React from "react";

import { Row, Button, Divider, Image } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <div>
      <Row justify={"end"}>
        {cartQuantity > 0 && (
          <Button
            onClick={openCart}
            style={{
              height: "60px",
              width: "60px",
            }}
            shape="round"
          >
            <ShoppingCartOutlined style={{}} />
            <div>{cartQuantity}</div>
          </Button>
        )}
      </Row>
      <Divider />
    </div>
  );
};

export default Navbar;
