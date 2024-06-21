import React, { useState } from "react";
import { Col, Row } from "antd";
import Input from "@/components/common/input";
import { MdDelete } from "react-icons/md";
import Button from "@/components/common/button";
import Modal from "@/components/ui/modal";
import Form from "@/components/common/form";
import Card from "@/components/ui/card";
import ZoneCard from "./ZoneCard";

const AddZones = ({ form }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    // form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ width: "150px", marginLeft: "auto" }}>
        <Button
          label="Add zone"
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        />
      </div>

      <ZoneCard />
      <Modal
        title="Add zone"
        open={isModalOpen}
        onCancel={handleCancel}
        className="modal"
        // onOk={handleOk}
        // confirmLoading={loading}
        okText="Add"
        onClose={handleCancel}
      >
        <Form form={form} layout="vertical">
          <div>
            <div>
              <Card bordered={false} style={{ borderRadius: "10px" }}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
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

                  <Col xs={24} sm={12}>
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
                  <Col xs={24} sm={12}>
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

                  <Col xs={24} sm={12}>
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

                  <Col xs={24} sm={12}>
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
                  <Col xs={24} sm={12}>
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
                  <Col xs={24} sm={12}>
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
                  <Col xs={24} sm={12}>
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
                  <Col xs={24} sm={12}>
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
                  <Col xs={24} sm={12}>
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
                </Row>
              </Card>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddZones;
