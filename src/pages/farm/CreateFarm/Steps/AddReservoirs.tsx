import React, { useState } from "react";
import { Col, Row, Form as AntdForm, Card } from "antd";
import Button from "@/components/common/button";
import Form from "@/components/common/form";
import Input from "@/components/common/input";
import { MdDelete } from "react-icons/md";

const AddReservoirs = () => {
  const [form] = AntdForm.useForm();
  const [reservoirs, setReservoirs] = useState([{ key: 0 }]);

  const addReservoir = () => {
    setReservoirs([...reservoirs, { key: reservoirs.length }]);
  };

  const deleteReservoir = (key) => {
    if (reservoirs.length > 1) {
      setReservoirs(reservoirs.filter((reservoir) => reservoir.key !== key));
    }
  };

  return (
    <div className="addForm">
      <div style={{ width: "150px", marginLeft: "auto" }}>
        <Button label="Add Reservoir" onClick={addReservoir} />
      </div>
      <div className="reservoir">
        <Form form={form} layout="vertical">
          {reservoirs.map((reservoir, index) => (
            <div key={reservoir.key}>
              <Card
                bordered={false}
                title={`#${index + 1}`}
                style={{ borderRadius: "10px" }}
                extra={
                  <div
                    style={{
                      color: "red",
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  >
                    <MdDelete onClick={() => deleteReservoir(reservoir.key)} />
                  </div>
                }
              >
                <Row gutter={24}>
                  <Col span={24}>
                    <Input
                      label={`Name`}
                      name={`name`}
                      rules={[
                        {
                          required: true,
                          message: "Please input your name",
                        },
                      ]}
                      placeholder="Enter your name"
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Input
                      label="Reservoir capacity (in liter)"
                      name={`reservoirCapacity`}
                      rules={[
                        {
                          required: true,
                          message: "Please input reservoir capacity",
                        },
                      ]}
                      placeholder="Enter reservoir capacity (in liter)"
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      label="Nutrient water reservoir capacity (in liter)"
                      name={`nutrientWaterReservoirCapacity`}
                      rules={[
                        {
                          required: true,
                          message:
                            "Please input nutrient water reservoir capacity",
                        },
                      ]}
                      placeholder="Enter nutrient water reservoir capacity (in liter)"
                    />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Input
                      label="PH reservoir capacity (in liter)"
                      name={`phReservoirCapacity`}
                      rules={[
                        {
                          required: true,
                          message: "Please input PH reservoir capacity",
                        },
                      ]}
                      placeholder="Enter PH reservoir capacity (in liter)"
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      label="Stock nutrient solution capacity (in liter)"
                      name={`stockNutrientSolutionCapacity`}
                      rules={[
                        {
                          required: true,
                          message:
                            "Please input stock nutrient solution capacity",
                        },
                      ]}
                      placeholder="Enter stock nutrient solution capacity (in liter)"
                    />
                  </Col>
                </Row>
              </Card>
            </div>
          ))}
        </Form>
      </div>
    </div>
  );
};

export default AddReservoirs;
