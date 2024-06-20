import React, { useState } from "react";
import { Col, Row, Card } from "antd";
import Input from "@/components/common/input";
import { MdDelete } from "react-icons/md";
import Button from "@/components/common/button";

const AddNursery = () => {
  const [nurseries, setNurseries] = useState([{ key: 0 }]);

  const addNursery = () => {
    setNurseries([...nurseries, { key: nurseries.length }]);
  };

  const deleteNursery = (key) => {
    setNurseries(nurseries.filter((nursery) => nursery.key !== key));
  };
  return (
    <div>
      <div style={{ width: "150px", marginLeft: "auto" }}>
        <Button label="Add nursery" onClick={addNursery} />
      </div>
      <div>
        {nurseries.map((nursery, index) => (
          <div key={nursery.key}>
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
                  <MdDelete onClick={() => deleteNursery(nursery.key)} />
                </div>
              }
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Input
                    label={`Nursery name`}
                    name={`name`}
                    rules={[
                      {
                        required: true,
                        message: "Please input nursery name",
                      },
                    ]}
                    placeholder="Enter nursery name"
                  />
                </Col>
                <Col span={12}>
                  <Input
                    label={`Nursery type`}
                    name={`type`}
                    rules={[
                      {
                        required: true,
                        message: "Please input nursery type",
                      },
                    ]}
                    placeholder="Enter nursery type"
                  />
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Input
                    label="Nursery area (in sq meters)"
                    name={`area`}
                    rules={[
                      {
                        required: true,
                        message: "Please input nursery area",
                      },
                    ]}
                    placeholder="Enter nursery area (in sq meters)"
                  />
                </Col>
                <Col span={12}>
                  <Input
                    label="Nursery germination type"
                    name={`germinationType`}
                    rules={[
                      {
                        required: true,
                        message: "Please input nursery germination type",
                      },
                    ]}
                    placeholder="Enter nursery germination type"
                  />
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Input
                    label="Nursery germination area (in sq meters)"
                    name={`germinationArea`}
                    rules={[
                      {
                        required: true,
                        message:
                          "Please input nursery germination area (in sq meters)",
                      },
                    ]}
                    placeholder="Enter nursery germination area (in sq meters)"
                  />
                </Col>
                <Col span={12}>
                  <Input
                    label="Seed count"
                    name={`seedCount`}
                    rules={[
                      {
                        required: true,
                        message: "Please input seed count",
                      },
                    ]}
                    placeholder="Enter seed count"
                  />
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Input
                    label="Watering type"
                    name={`wateringType`}
                    rules={[
                      {
                        required: true,
                        message: "Please input watering type",
                      },
                    ]}
                    placeholder="Enter watering type"
                  />
                </Col>
                <Col span={12}>
                  <Input
                    label="Watering schedule"
                    name={`wateringSchedule`}
                    rules={[
                      {
                        required: true,
                        message: "Please input watering schedule",
                      },
                    ]}
                    placeholder="Enter watering schedule"
                  />
                </Col>
              </Row>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddNursery;
