import React, { useState } from "react";
import { Col, Row, Card } from "antd";
import Input from "@/components/common/input";
import { MdDelete } from "react-icons/md";
import Button from "@/components/common/button";

const AddZones = () => {
  const [zones, setZones] = useState([{ key: 0 }]);

  const AddZone = () => {
    setZones([...zones, { key: zones.length }]);
  };

  const deletZone = (key) => {
    setZones(zones.filter((zone) => zone.key !== key));
  };
  return (
    <div>
      <div style={{ width: "150px", marginLeft: "auto" }}>
        <Button label="Add zone" onClick={AddZone} />
      </div>
      <div>
        {zones.map((zone, index) => (
          <div key={zone.key}>
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
                  <MdDelete onClick={() => deletZone(zone.key)} />
                </div>
              }
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Input
                    label={`Zone name`}
                    name={`name`}
                    rules={[
                      {
                        required: true,
                        message: "Please input zone name",
                      },
                    ]}
                    placeholder="Enter zone name"
                  />
                </Col>
                <Col span={12}>
                  <Input
                    label={`System type`}
                    name={`systemType`}
                    rules={[
                      {
                        required: true,
                        message: "Please input System type",
                      },
                    ]}
                    placeholder="Enter System type"
                  />
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Input
                    label="Zone area (in sq meters)"
                    name={`area`}
                    rules={[
                      {
                        required: true,
                        message: "Please input zone area",
                      },
                    ]}
                    placeholder="Enter zone area (in sq meters)"
                  />
                </Col>
                <Col span={12}>
                  <Input
                    label="Zone growing area (in sq meters)"
                    name={`zoneGrowingArea`}
                    rules={[
                      {
                        required: true,
                        message: "Please input zone growing area",
                      },
                    ]}
                    placeholder="Enter zone growing area (in sq meters)"
                  />
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Input
                    label="Row count"
                    name={`rowCount`}
                    rules={[
                      {
                        required: true,
                        message: "Please input row count",
                      },
                    ]}
                    placeholder="Enter row count"
                  />
                </Col>
                <Col span={12}>
                  <Input
                    label="Row spacing"
                    name={`rowSpacing`}
                    rules={[
                      {
                        required: true,
                        message: "Please input row spacing",
                      },
                    ]}
                    placeholder="Enter row spacing"
                  />
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Input
                    label="Plant spacing"
                    name={`plantSpacing`}
                    rules={[
                      {
                        required: true,
                        message: "Please input plant spacing",
                      },
                    ]}
                    placeholder="Enter plant spacing"
                  />
                </Col>
                <Col span={12}>
                  <Input
                    label="Plant count per row"
                    name={`plantCountPerRow`}
                    rules={[
                      {
                        required: true,
                        message: "Please input plant count per row",
                      },
                    ]}
                    placeholder="Enter plant count per row"
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
                    name={`plantCountPerRow`}
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

export default AddZones;
