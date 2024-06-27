import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "antd";
import Button from "@/components/common/button";
import Form from "@/components/common/form";
import Input from "@/components/common/input";
import Card from "@/components/ui/card";
import { MdDelete } from "react-icons/md";
import { REGEX, applyErrorsToFields } from "../const";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import FarmActions from "@/redux/farm/action";

const selectError = makeSelectErrorModel();

const AddReservoirs = ({ form, reservoirs, setReservoirs }) => {
  const error = useSelector((state) =>
    selectError(state, FarmActions.ADD_FARM_FINISHED)
  );

  useEffect(() => {
    if (error) applyErrorsToFields(form, error.errors, "reservoirs");
  }, [error]);

  const addReservoir = () => {
    setReservoirs([...reservoirs, { key: reservoirs.length }]);
  };

  const deleteReservoir = (key) => {
    setReservoirs(reservoirs.filter((reservoir) => reservoir.key !== key));
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
                      name={`name_${index}`}
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
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Input
                      label="Reservoir capacity (in liter)"
                      name={`reservoirCapacity_${index}`}
                      rules={[
                        {
                          required: true,
                          message: "Please input reservoir capacity",
                        },
                        {
                          pattern: REGEX.number,
                          message:
                            "Please provide valid reservoir capacity (e.g., 2, 2.5)",
                        },
                      ]}
                      placeholder="Enter reservoir capacity (in liter)"
                    />
                  </Col>
                  <Col xs={24} sm={12}>
                    <Input
                      label="PH reservoir capacity (in liter)"
                      name={`phReservoirCapacity_${index}`}
                      rules={[
                        {
                          required: true,
                          message: "Please input PH reservoir capacity",
                        },
                        {
                          pattern: REGEX.number,
                          message:
                            "Please provide valid Ph reservoir capacity (e.g., 2, 2.5)",
                        },
                      ]}
                      placeholder="Enter PH reservoir capacity (in liter)"
                    />
                  </Col>
                  <Col xs={24} sm={12}>
                    <Input
                      label="Nutrient water reservoir capacity (in liter)"
                      name={`nutrientWaterReservoirCapacity_${index}`}
                      rules={[
                        {
                          required: true,
                          message:
                            "Please input nutrient water reservoir capacity",
                        },
                        {
                          pattern: REGEX.number,
                          message:
                            "Please provide valid nutrient water reservoir capacity (e.g., 2, 2.5)",
                        },
                      ]}
                      placeholder="Enter nutrient water reservoir capacity (in liter)"
                    />
                  </Col>
                  <Col xs={24} sm={12}>
                    <Input
                      label="Stock nutrient solution capacity (in liter)"
                      name={`stockNutrientSolutionCapacity_${index}`}
                      rules={[
                        {
                          required: true,
                          message:
                            "Please input stock nutrient solution capacity",
                        },
                        {
                          pattern: REGEX.number,
                          message:
                            "Please provide valid stock nutrient solution (e.g., 2, 2.5)",
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
