import { Checkbox, Col, Drawer, Input, Radio, Row } from "antd";
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

  const [inputValue, setInputValue] = useState<string>("");

  const [fixedDisabled, setFixedDisabled] = useState(false);
  const [percentDisabled, setPercentDisabled] = useState(false);
  const [categoryDisabled, setCategoryDisabled] = useState("");
  const [pointDisabled, setPointDisabled] = useState(false);

  console.log("inputValue", inputValue);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isNumericKey = /^[0-9]$/.test(e.key);
    const isBackspaceOrDelete = e.key === "Backspace" || e.key === "Delete";

    if (!isNumericKey && !isBackspaceOrDelete) {
      e.preventDefault();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (parseInt(inputValue) > 20) {
      alert("Input value is greater than 20!");

      setInputValue("");
    } else {
      console.log("Collected data:", inputValue);
      setInputValue(e.target.value);
    }

    setCategoryDisabled(e.target.value);
  };

  const handleCheckboxChange = (checkedValues: CheckboxValueType[]) => {
    setValue(checkedValues);

    setFixedDisabled(checkedValues.includes("percent"));
    setPercentDisabled(checkedValues.includes("fixed"));
    setPointDisabled(checkedValues.includes("percentCategory"));
  };
  // console.log(value);

  const options = [
    { label: "Fixed Price Discount", value: "fixed", disabled: fixedDisabled },
    {
      label: "Percent Price Discount",
      value: "percent",
      disabled: percentDisabled,
    },
    {
      label: "Percentage Discount By Item Category",
      value: "percentCategory",
      disabled: categoryDisabled,
    },
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
          <Col
            style={{
              marginBottom: "3px",
            }}
          >
            <Checkbox.Group options={options} onChange={handleCheckboxChange} />
          </Col>
          <Row gutter={[8, 8]} justify={"start"}>
            <Col>Discount by point</Col>
            <Col>
              <Input
                placeholder=""
                onChange={handleInputChange}
                value={inputValue}
                onKeyDown={handleKeyDown}
                disabled={pointDisabled}
              />
            </Col>
          </Row>
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

            if (value.includes("fixed")) {
              discountAmount += fixed_discount;
            }
            if (value.includes("percent")) {
              discountAmount += (itemTotal * percent_discount) / 100;
            }
            if (value.includes("percentCategory") && item?.category) {
              const categoryDiscount = categoryDiscounts[item.category] || 0;
              discountAmount +=
                ((itemTotal - discountAmount) * categoryDiscount) / 100;
            }
            if (parseInt(inputValue) <= 20) {
              discountAmount +=
                (itemTotal - discountAmount) * (parseInt(inputValue) / 100);
            }
            if (
              value.includes("seasonal") &&
              itemTotal >= seasonal_x_threshold * Math.floor(itemTotal / 100)
            ) {
              discountAmount +=
                Math.floor(
                  (itemTotal - discountAmount) / seasonal_x_threshold
                ) * seasonal_discount;
              console.log("");
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
