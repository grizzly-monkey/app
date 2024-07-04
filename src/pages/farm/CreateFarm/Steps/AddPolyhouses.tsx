import React, { useState } from "react";
import { Col, Row, Collapse, Tabs } from "antd";
import Button from "@/components/common/button";
import Form from "@/components/common/form";
import Input from "@/components/common/input";
import Card from "@/components/ui/card";
import { MdDelete } from "react-icons/md";
import AddZones from "./AddZones";
import AddNursery from "./AddNursery";

const { Panel } = Collapse;
const { TabPane } = Tabs;

const AddPolyhouses = () => {
  const [polyhouses, setPolyhouses] = useState([{ key: 0 }]);

  const addPolyhouse = () => {
    setPolyhouses([...polyhouses, { key: polyhouses.length }]);
  };

  const deletePolyhouse = (key) => {
    setPolyhouses(polyhouses.filter((polyhouse) => polyhouse.key !== key));
  };

  return (
    <div className="addForm">
      <div style={{ width: "150px", marginLeft: "auto" }}>
        <Button label="Add polyhouse" onClick={addPolyhouse} />
      </div>
      <div className="reservoir">
        <Form form={form} layout="vertical">
          {polyhouses.map((polyhouse, index) => (
            <div key={polyhouse.key}>
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
                    <MdDelete onClick={() => deletePolyhouse(polyhouse.key)} />
                  </div>
                }
              >
                <Row gutter={24}>
                  <Col span={24}>
                    <Input
                      label={`Polyhouse name`}
                      name={`name`}
                      rules={[
                        {
                          required: true,
                          message: "Please input polyhouse name",
                        },
                      ]}
                      placeholder="Enter polyhouse name"
                    />
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Input
                      label="Structure expected life"
                      name={`structureExpectedLife`}
                      rules={[
                        {
                          required: true,
                          message: "Please input structure expected life",
                        },
                      ]}
                      placeholder="Enter structure expected life"
                    />
                  </Col>
                  <Col xs={24} sm={12}>
                    <Input
                      label="Plastic expected life"
                      name={`plasticExpectedLife`}
                      rules={[
                        {
                          required: true,
                          message: "Please input plastic expected life",
                        },
                      ]}
                      placeholder="Enter plastic expected life"
                    />
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={24}>
                    <Tabs defaultActiveKey="1">
                      <TabPane tab="Configure zones" key="1">
                        <AddZones form={form} />
                      </TabPane>
                      <TabPane tab="Configure nurseries" key="2">
                        <AddNursery form={form} />
                      </TabPane>
                    </Tabs>
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

export default AddPolyhouses;
