import { Drawer, Row } from "antd";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";

type ShoppingCartProps = {
  isOpen: boolean;
};

const Cart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart();

  return (
    <Drawer title="Shopping Cart" open={isOpen} onClose={closeCart}>
      <Row>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </Row>
    </Drawer>
  );
};

export default Cart;
