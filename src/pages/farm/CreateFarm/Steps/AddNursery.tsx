import React, { useState } from "react";
import { Col, Row, Card } from "antd";
import Input from "@/components/common/input";
import { MdDelete } from "react-icons/md";
import Button from "@/components/common/button";
import Modal from "@/components/ui/modal";
import Form from "@/components/common/form";

const AddNursery = ({ form }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    // form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ width: "150px", marginLeft: "auto" }}>
        <Button
          label="Add nursery"
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        />
      </div>

      <Modal
        title="Add nusery"
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
                  <Col xs={24} sm={12}>
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

                  <Col xs={24} sm={12}>
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
                  <Col xs={24} sm={12}>
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

                  <Col xs={24} sm={12}>
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
                  <Col xs={24} sm={12}>
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
                  <Col xs={24} sm={12}>
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
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNursery;
