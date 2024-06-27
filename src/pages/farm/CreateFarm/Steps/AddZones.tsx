import React, { useState, useEffect } from "react";
import { Col, Row, Form as AntdForm } from "antd";
import Input from "@/components/common/input";
import Button from "@/components/common/button";
import Modal from "@/components/ui/modal";
import Form from "@/components/common/form";
import Card from "@/components/ui/card";
import ZoneCard from "./ZoneCard";
import Select from "@/components/ui/select";
import { REGEX, applyErrorsToCardFields, applyErrorsToFields } from "../const";

const AddZones = ({ polyhouseKey, zones, addZone, updateZones, errors }) => {
  const [form] = AntdForm.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentZone, setCurrentZone] = useState(null);

  const systemType = [
    { label: "NFT system", value: "NFT system" },
    { label: "Trough system", value: "Trough system" },
    { label: "Raft system", value: "Raft system" },
    { label: "Dutch bucket system", value: "Dutch bucket system" },
  ];

  const wateringType = [
    { label: "Manual", value: "Manual" },
    { label: "Automatic", value: "Automatic" },
  ];

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setCurrentZone(null);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newZone = {
          name: values.name,
          systemType: values.systemType,
          area: parseFloat(values.area),
          growingArea: {
            area: parseFloat(values[`growingArea.area`]),
            rowCount: parseFloat(values[`growingArea.rowCount`]),
            plantCountPerRow: parseFloat(
              values[`growingArea.plantCountPerRow`]
            ),
            plantSpacing: parseFloat(values[`growingArea.plantSpacing`]),
            rowSpacing: parseFloat(values[`growingArea.rowSpacing`]),
            wateringType: values[`growingArea.wateringType`],
            wateringSchedule: values[`growingArea.wateringSchedule`],
          },
          key: currentZone ? currentZone.key : zones.length,
        };

        if (currentZone) {
          const updatedZones = zones.map((zone) =>
            zone.key === currentZone.key ? newZone : zone
          );
          updateZones(polyhouseKey, updatedZones);
        } else {
          addZone(polyhouseKey, newZone);
        }

        form.resetFields();
        setIsModalOpen(false);
        setCurrentZone(null);
      })
      .catch(() => {});
  };

  const handleEdit = (zone) => {
    form.setFieldsValue({
      ...zone,
      "growingArea.area": zone.growingArea.area,
      "growingArea.rowCount": zone.growingArea.rowCount,
      "growingArea.plantCountPerRow": zone.growingArea.plantCountPerRow,
      "growingArea.plantSpacing": zone.growingArea.plantSpacing,
      "growingArea.rowSpacing": zone.growingArea.rowSpacing,
      "growingArea.wateringType": zone.growingArea.wateringType,
      "growingArea.wateringSchedule": zone.growingArea.wateringSchedule,
    });
    setCurrentZone(zone);
    setIsModalOpen(true);
  };

  const handleDelete = (zoneKey) => {
    const updatedZones = zones.filter((zone) => zone.key !== zoneKey);
    updateZones(polyhouseKey, updatedZones);
  };

  useEffect(() => {
    if (errors && currentZone) {
      applyErrorsToCardFields(form, errors, currentZone.key, "zones");
    }
  }, [errors, currentZone]);

  return (
    <div>
      <div style={{ width: "150px", marginLeft: "auto" }}>
        <Button
          label="Add zone"
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
      </div>

      <ZoneCard
        zones={zones}
        onEdit={handleEdit}
        onDelete={handleDelete}
        errors={errors}
      />

      <Modal
        title={currentZone ? "Edit zone" : "Add zone"}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        okText={currentZone ? "Update" : "Add"}
        onClose={handleCancel}
        className="modal"
      >
        <Form form={form} layout="vertical">
          <Card bordered={false} style={{ borderRadius: "10px" }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Input
                  label={`Zone name`}
                  name={`name`}
                  rules={[
                    { required: true, message: "Please input zone name" },
                  ]}
                  placeholder="Enter zone name"
                />
              </Col>
              <Col xs={24} sm={12}>
                <AntdForm.Item
                  label={`System type`}
                  name={`systemType`}
                  rules={[
                    { required: true, message: "Please input system type" },
                  ]}
                >
                  <Select
                    placeholder="Select system type"
                    options={systemType}
                  />
                </AntdForm.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Input
                  label="Zone area (in sq meters)"
                  name={`area`}
                  rules={[
                    { required: true, message: "Please input zone area" },
                    {
                      pattern: REGEX.number,
                      message:
                        "Please provide valid zone area (e.g., 20000, 200.5)",
                    },
                  ]}
                  placeholder="Enter zone area (in sq meters)"
                />
              </Col>
              <Col xs={24} sm={12}>
                <Input
                  label="Zone growing area (in sq meters)"
                  name={`growingArea.area`}
                  rules={[
                    {
                      required: true,
                      message: "Please input zone growing area",
                    },
                    {
                      pattern: REGEX.number,
                      message:
                        "Please provide valid zone growing area (e.g., 20000, 200.5)",
                    },
                  ]}
                  placeholder="Enter zone growing area (in sq meters)"
                />
              </Col>
              <Col xs={24} sm={12}>
                <Input
                  label="Row count"
                  name={`growingArea.rowCount`}
                  rules={[
                    { required: true, message: "Please input row count" },
                    {
                      pattern: REGEX.number,
                      message:
                        "Please provide valid row count (e.g., 20000, 200.5)",
                    },
                  ]}
                  placeholder="Enter row count"
                />
              </Col>
              <Col xs={24} sm={12}>
                <Input
                  label="Row spacing"
                  name={`growingArea.rowSpacing`}
                  rules={[
                    { required: true, message: "Please input row spacing" },
                    {
                      pattern: REGEX.number,
                      message:
                        "Please provide valid row spacing (e.g., 20000, 200.5)",
                    },
                  ]}
                  placeholder="Enter row spacing"
                />
              </Col>
              <Col xs={24} sm={12}>
                <Input
                  label="Plant spacing"
                  name={`growingArea.plantSpacing`}
                  rules={[
                    { required: true, message: "Please input plant spacing" },
                    {
                      pattern: REGEX.number,
                      message:
                        "Please provide valid plant spacing (e.g., 20000, 200.5)",
                    },
                  ]}
                  placeholder="Enter plant spacing"
                />
              </Col>
              <Col xs={24} sm={12}>
                <Input
                  label="Plant count per row"
                  name={`growingArea.plantCountPerRow`}
                  rules={[
                    {
                      required: true,
                      message: "Please input plant count per row",
                    },
                    {
                      pattern: REGEX.number,
                      message:
                        "Please provide valid plant count per row (e.g., 20000, 200.5)",
                    },
                  ]}
                  placeholder="Enter plant count per row"
                />
              </Col>
              <Col xs={24} sm={12}>
                <AntdForm.Item
                  label="Watering type"
                  name={`growingArea.wateringType`}
                  rules={[
                    { required: true, message: "Please input watering type" },
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
                  name={`growingArea.wateringSchedule`}
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

export default AddZones;
