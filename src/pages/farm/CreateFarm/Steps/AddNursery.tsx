import React, { useState, useEffect } from "react";
import { Col, Row, Form as AntdForm } from "antd";
import Input from "@/components/common/input";
import { MdDelete } from "react-icons/md";
import Button from "@/components/common/button";
import Modal from "@/components/ui/modal";
import Form from "@/components/common/form";
import Card from "@/components/ui/card";
import NuseryCard from "./NurseryCard";
import Select from "@/components/ui/select";
import { REGEX, applyErrorsToCardFields } from "../const";

const AddNursery = ({
  polyhouseKey,
  nurseries,
  addNursery,
  updateNurseries,
  errors,
}) => {
  const [form] = AntdForm.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNursery, setCurrentNursery] = useState(null);

  const nurseryType = [
    {
      label: "Open (no humidity control)",
      value: "Open (no humidity control)",
    },
    {
      label: "Closed dome (humidity control)",
      value: "Closed dome (humidity control)",
    },
  ];

  const nurseryGerminationType = [
    {
      label: "Tray with coco peat",
      value: "Tray with coco peat",
    },
    {
      label: "Oasis cubies",
      value: "Oasis cubies",
    },
    {
      label: "Coco plugs",
      value: "Coco plugs",
    },
  ];

  const wateringType = [
    {
      label: "Manual",
      value: "Manual",
    },
    {
      label: "Automatic",
      value: "Automatic",
    },
  ];

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setCurrentNursery(null);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newNursery = {
          ...values,
          area: parseFloat(values.area),
          seedCount: parseFloat(values.seedCount),
          germinationArea: parseFloat(values.germinationArea),
          key: currentNursery ? currentNursery.key : nurseries.length,
        };

        if (currentNursery) {
          const updatedNurseries = nurseries.map((nursery) =>
            nursery.key === currentNursery.key ? newNursery : nursery
          );
          updateNurseries(polyhouseKey, updatedNurseries);
        } else {
          addNursery(polyhouseKey, newNursery);
        }

        form.resetFields();
        setIsModalOpen(false);
        setCurrentNursery(null);
      })
      .catch(() => {});
  };

  const handleEdit = (nursery) => {
    form.setFieldsValue(nursery);
    setCurrentNursery(nursery);
    setIsModalOpen(true);
  };

  const handleDelete = (nurseryKey) => {
    const updatedNurseries = nurseries.filter(
      (nursery) => nursery.key !== nurseryKey
    );
    updateNurseries(polyhouseKey, updatedNurseries);
  };

  useEffect(() => {
    if (errors && currentNursery) {
      applyErrorsToCardFields(form, errors, currentNursery.key, "nurseries");
    }
  }, [errors, currentNursery]);

  return (
    <div>
      <div style={{ width: "150px", marginLeft: "auto" }}>
        <Button label="Add nursery" onClick={() => setIsModalOpen(true)} />
      </div>

      <NuseryCard
        nurseries={nurseries}
        onEdit={handleEdit}
        onDelete={handleDelete}
        errors={errors}
      />

      <Modal
        title={currentNursery ? "Edit nursery" : "Add nursery"}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        onClose={handleCancel}
        okText={currentNursery ? "Update" : "Add"}
        className="modal"
      >
        <Form form={form} layout="vertical">
          <Card bordered={false} style={{ borderRadius: "10px" }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Input
                  label="Nursery name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input nursery name" },
                  ]}
                  placeholder="Enter nursery name"
                />
              </Col>
              <Col xs={24} sm={12}>
                <AntdForm.Item
                  label="Nursery type"
                  name="type"
                  rules={[
                    { required: true, message: "Please input nursery type" },
                  ]}
                >
                  <Select
                    placeholder="Select nursery type"
                    options={nurseryType}
                  />
                </AntdForm.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Input
                  label="Nursery area (in sq meters)"
                  name="area"
                  rules={[
                    { required: true, message: "Please input nursery area" },
                    {
                      pattern: REGEX.number,
                      message:
                        "Please provide valid nursery area (e.g., 20000, 200.5)",
                    },
                  ]}
                  placeholder="Enter nursery area (in sq meters)"
                />
              </Col>
              <Col xs={24} sm={12}>
                <AntdForm.Item
                  label="Nursery germination type"
                  name="germinationType"
                  rules={[
                    {
                      required: true,
                      message: "Please input nursery germination type",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select nursery germination type"
                    options={nurseryGerminationType}
                  />
                </AntdForm.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Input
                  label="Nursery germination area (in sq meters)"
                  name="germinationArea"
                  rules={[
                    {
                      required: true,
                      message:
                        "Please input nursery germination area (in sq meters)",
                    },
                    {
                      pattern: REGEX.number,
                      message:
                        "Please provide valid nursery germination area (e.g., 20000, 200.5)",
                    },
                  ]}
                  placeholder="Enter nursery germination area (in sq meters)"
                />
              </Col>
              <Col xs={24} sm={12}>
                <Input
                  label="Seed count"
                  name="seedCount"
                  rules={[
                    { required: true, message: "Please input seed count" },
                    {
                      pattern: REGEX.number,
                      message:
                        "Please provide valid seed count (e.g., 20000, 200.5)",
                    },
                  ]}
                  placeholder="Enter seed count"
                />
              </Col>
              <Col xs={24} sm={12}>
                <AntdForm.Item
                  label="Watering type"
                  name={`wateringType`}
                  rules={[
                    {
                      required: true,
                      message: "Please input watering type",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select watering type"
                    options={wateringType}
                  />
                </AntdForm.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Input
                  label="Watering schedule"
                  name="wateringSchedule"
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
        </Form>
      </Modal>
    </div>
  );
};

export default AddNursery;
