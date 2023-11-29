import "./App.css";
import { Row, Col, Card } from "antd";
import Items from "./data/items.json";
import { MyItems } from "./components/Items";

function App() {
  return (
    <>
      <Row justify={"center"} style={{}}>
        <Card
          style={{
            width: "100%",
          }}
        >
          <Row gutter={[8, 8]} justify={"start"}>
            {Items.map((item) => (
              <Col key={item.id} span={8}>
                <MyItems {...item} />
              </Col>
            ))}
          </Row>
        </Card>
        <Col span={24}></Col>
      </Row>
    </>
  );
}

export default App;
