import { Col, Drawer, Row } from "antd";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import Items from "../data/items.json";

type ShoppingCartProps = {
  isOpen: boolean;
};

interface Discount {
  type:
    | "FixedAmountCoupon"
    | "PercentageCoupon"
    | "CategoryPercentage"
    | "PointsOnTop"
    | "Seasonal";
  value: number;
  category?: string;
  threshold?: number;
  discountAmount?: number;
}

const applyDiscounts = (cart: CartItem[], discounts: Discount[]): number => {
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  for (const discount of discounts) {
    switch (discount.type) {
      case "FixedAmountCoupon":
        total -= Math.min(discount.value, total);
        break;
      case "PercentageCoupon":
        total -= (discount.value / 100) * total;
        break;
      case "CategoryPercentage":
        const categoryItems = cart.filter(
          (item) => item.category === discount.category
        );
        const categoryTotal = categoryItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        total -= (discount.value / 100) * categoryTotal;
        break;
      case "PointsOnTop":
        total -= Math.min(discount.value, 0.2 * total);
        break;
      case "Seasonal":
        total -= Math.min(
          Math.floor(total / discount.threshold) * discount.discountAmount,
          total
        );
        break;
      default:
        break;
    }
  }

  return Math.max(total, 0);
};

const Cart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart();

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
          Discounted
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
            return total + (item?.price || 0) * CartItem.quantity;
          }, 0)}
          $
        </Col>
      </Row>
    </Drawer>
  );
};

export default Cart;
