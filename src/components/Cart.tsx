import { Checkbox, Col, Drawer, Radio, Row } from "antd";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import Items from "../data/items.json";
import { useState } from "react";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

type ShoppingCartProps = {
  isOpen: boolean;
};

const Cart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart();
  const [value, setValue] = useState<CheckboxValueType[]>([]);
  const [seasonalDiscountCount, setSeasonalDiscountCount] = useState(0);

  const handleCheckboxChange = (checkedValues: CheckboxValueType[]) => {
    setValue(checkedValues);
  };
  // console.log(value);

  const options = [
    { label: "Fixed Price Discount", value: "fixed" },
    { label: "Percent Price Discount", value: "percent" },
    { label: "Percentage Discount By Item Category", value: "percentCategory" },
    { label: "Seasonal discount", value: "seasonal" },
  ];

  return (
    <Drawer width={500} title="Shopping Cart" open={isOpen} onClose={closeCart}>
      <Row>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
        <Col span={24}>
          <Col
            style={{
              fontWeight: "bold",
              fontSize: "5",
              marginTop: "8px",
            }}
          >
            Discounted
          </Col>
          <Checkbox.Group options={options} onChange={handleCheckboxChange} />
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
            const itemTotal = (item?.price || 0) * CartItem.quantity;

            console.log("seasonalDiscountCount", seasonalDiscountCount);
            let discountAmount = 0;
            const fixed_discount = 4;
            const percent_discount = 15;
            const categoryDiscounts = {
              keyboard: "5", // 5% discount for items in the keyboard category
              keycap: "5", // 10% discount for items in the keycap category
              switch: "8", // 8% discount for items in the switch category
            };
            const seasonal_discount = 10;
            const seasonal_x_threshold = 100;
            const seasonal_y_increment = 10;

            if (value.includes("fixed")) {
              discountAmount = fixed_discount;
            } else if (value.includes("percent")) {
              discountAmount = (itemTotal * percent_discount) / 100;
            } else if (value.includes("percentCategory") && item?.category) {
              const categoryDiscount = categoryDiscounts[item.category] || 0;
              discountAmount = (itemTotal * categoryDiscount) / 100;
            } else if (
              value.includes("seasonal") &&
              itemTotal >= seasonal_x_threshold * (seasonalDiscountCount + 1)
            ) {
              discountAmount =
                seasonal_discount +
                seasonalDiscountCount * seasonal_y_increment;
              setSeasonalDiscountCount((prevCount) => prevCount + 1);
              console.log("seasonalDiscount", seasonalDiscountCount);
            } else {
              // discountAmount = 1;
            }
            console.log("discount", discountAmount);
            return total + itemTotal - discountAmount;
          }, 0)}
          $
        </Col>
      </Row>
    </Drawer>
  );
};

export default Cart;
