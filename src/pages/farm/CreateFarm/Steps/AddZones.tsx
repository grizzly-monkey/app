import { useState, useEffect } from "react";
import { Col, Row, Form as AntdForm } from "antd";
import Input from "@/components/common/input";
import Button from "@/components/common/button";
import Modal from "@/components/ui/modal";
import Form from "@/components/common/form";
import Card from "@/components/ui/card";
import ZoneCard from "./ZoneCard";
import Select from "@/components/ui/select";
import { REGEX, applyErrorsToCardFields } from "../const";
import { getTranslation } from "@/translation/i18n";

const AddZones = ({
  polyhouseKey,
  zones,
  addZone,
  updateZones,
  errors,
}: any) => {
  const [form] = AntdForm.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentZone, setCurrentZone] = useState<any>(null);

  const systemType = [
    {
      label: `${getTranslation(
        "farm.createFarm.polyhouse.zone.systemType.NFTsystem"
      )}`,
      value: "NFT system",
    },
    {
      label: `${getTranslation(
        "farm.createFarm.polyhouse.zone.systemType.troughSystem"
      )}`,
      value: "Trough system",
    },
    {
      label: `${getTranslation(
        "farm.createFarm.polyhouse.zone.systemType.raftSystem"
      )}`,
      value: "Raft system",
    },
    {
      label: `${getTranslation(
        "farm.createFarm.polyhouse.zone.systemType.dutchBucketSystem"
      )}`,
      value: "Dutch bucket system",
    },
  ];

  const wateringType = [
    { label: `${getTranslation("global.manual")}`, value: "Manual" },
    { label: `${getTranslation("global.automatic")}`, value: "Automatic" },
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
          const updatedZones = zones.map((zone: any) =>
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

  const handleEdit = (zone: any) => {
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

  const handleDelete = (zoneKey: any) => {
    const updatedZones = zones.filter((zone: any) => zone.key !== zoneKey);
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
          label={getTranslation("farm.createFarm.polyhouse.zone.addZone")}
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
        title={
          currentZone
            ? `${getTranslation("farm.createFarm.polyhouse.zone.editZone")}`
            : `${getTranslation("farm.createFarm.polyhouse.zone.addZone")}`
        }
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        okText={
          currentZone
            ? `${getTranslation("global.add")}`
            : `${getTranslation("global.update")}`
        }
        onClose={handleCancel}
        className="modal"
      >
        <Form form={form} layout="vertical">
          <Card bordered={false} style={{ borderRadius: "10px" }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Input
                  label={getTranslation("farm.createFarm.polyhouse.zone.name")}
                  name={`name`}
                  rules={[
                    {
                      required: true,
                      message: `${getTranslation(
                        "farm.createFarm.polyhouse.zone.nameMessage"
                      )}`,
                    },
                  ]}
                  placeholder={getTranslation(
                    "farm.createFarm.polyhouse.zone.namePlaceholder"
                  )}
                />
              </Col>
              <Col xs={24} sm={12}>
                <AntdForm.Item
                  label={getTranslation(
                    "farm.createFarm.polyhouse.zone.systemType"
                  )}
                  name={`systemType`}
                  rules={[
                    {
                      required: true,
                      message: `${getTranslation(
                        "farm.createFarm.polyhouse.zone.systemTypeMessage"
                      )}`,
                    },
                  ]}
                >
                  <Select
                    placeholder={getTranslation(
                      "farm.createFarm.polyhouse.zone.systemTypePlaceholder"
                    )}
                    options={systemType}
                  />
                </AntdForm.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Input
                  label={getTranslation(
                    "farm.createFarm.polyhouse.zone.zoneArea"
                  )}
                  name={`area`}
                  rules={[
                    {
                      required: true,
                      message: `${getTranslation(
                        "farm.createFarm.polyhouse.zone.zoneAreaMessage"
                      )}`,
                    },
                    {
                      pattern: REGEX.number,
                      message: `${getTranslation(
                        "farm.createFarm.polyhouse.zone.zoneAreaRegexMessage"
                      )}`,
                    },
                  ]}
                  placeholder={getTranslation(
                    "farm.createFarm.polyhouse.zone.zoneAreaPlaceholder"
                  )}
                />
              </Col>
              <Col xs={24} sm={12}>
                <Input
                  label={getTranslation(
                    "farm.createFarm.polyhouse.zone.growArea"
                  )}
                  name={`growingArea.area`}
                  rules={[
                    {
                      required: true,
                      message: `${getTranslation(
                        "farm.createFarm.polyhouse.zone.growAreaMessage"
                      )}`,
                    },
                    {
                      pattern: REGEX.number,
                      message: `${getTranslation(
                        "farm.createFarm.polyhouse.zone.growAreaRegexMessage"
                      )}`,
                    },
                  ]}
                  placeholder={getTranslation(
                    "farm.createFarm.polyhouse.zone.growAreaPlaceholder"
                  )}
                />
              </Col>
              <Col xs={24} sm={12}>
                <Input
                  label={getTranslation(
                    "farm.createFarm.polyhouse.zone.rowCount"
                  )}
                  name={`growingArea.rowCount`}
                  rules={[
                    {
                      required: true,
                      message: `${getTranslation(
                        "farm.createFarm.polyhouse.zone.rowCountMessage"
                      )}`,
                    },
                    {
                      pattern: REGEX.number,
                      message: `${getTranslation(
                        "farm.createFarm.polyhouse.zone.rowCountRegexMessage"
                      )}`,
                    },
                  ]}
                  placeholder={getTranslation(
                    "farm.createFarm.polyhouse.zone.rowCountPlaceholder"
                  )}
                />
              </Col>
              <Col xs={24} sm={12}>
                <Input
                  label={getTranslation(
                    "farm.createFarm.polyhouse.zone.rowSpacing"
                  )}
                  name={`growingArea.rowSpacing`}
                  rules={[
                    {
                      required: true,
                      message: `${getTranslation(
                        "farm.createFarm.polyhouse.zone.rowSpacingMessage"
                      )}`,
                    },
                    {
                      pattern: REGEX.number,
                      message: `${getTranslation(
                        "farm.createFarm.polyhouse.zone.rowSpacingRegexMessage"
                      )}`,
                    },
                  ]}
                  placeholder={getTranslation(
                    "farm.createFarm.polyhouse.zone.rowSpacingPlaceholder"
                  )}
                />
              </Col>
              <Col xs={24} sm={12}>
                <Input
                  label={getTranslation(
                    "farm.createFarm.polyhouse.zone.plantSpacing"
                  )}
                  name={`growingArea.plantSpacing`}
                  rules={[
                    {
                      required: true,
                      message: `${getTranslation(
                        "farm.createFarm.polyhouse.zone.plantSpacingMessage"
                      )}`,
                    },
                    {
                      pattern: REGEX.number,
                      message: `${getTranslation(
                        "farm.createFarm.polyhouse.zone.plantSpacingRegexMessage"
                      )}`,
                    },
                  ]}
                  placeholder={getTranslation(
                    "farm.createFarm.polyhouse.zone.plantSpacingPlaceholder"
                  )}
                />
              </Col>
              <Col xs={24} sm={12}>
                <Input
                  label={getTranslation(
                    "farm.createFarm.polyhouse.zone.plantCountPerRow"
                  )}
                  name={`growingArea.plantCountPerRow`}
                  rules={[
                    {
                      required: true,
                      message: `${getTranslation(
                        "farm.createFarm.polyhouse.zone.plantCountPerRowMessage"
                      )}`,
                    },
                    {
                      pattern: REGEX.number,
                      message: `${getTranslation(
                        "farm.createFarm.polyhouse.zone.plantCountPerRowRegexMessage"
                      )}`,
                    },
                  ]}
                  placeholder={getTranslation(
                    "farm.createFarm.polyhouse.zone.plantCountPerRowPlaceholder"
                  )}
                />
              </Col>
              <Col xs={24} sm={12}>
                <AntdForm.Item
                  label={getTranslation(
                    "farm.createFarm.polyhouse.zone.wateringType"
                  )}
                  name={`growingArea.wateringType`}
                  rules={[
                    {
                      required: true,
                      message: `${getTranslation(
                        "farm.createFarm.polyhouse.zone.wateringTypeMessage"
                      )}`,
                    },
                  ]}
                >
                  <Select
                    placeholder={getTranslation(
                      "farm.createFarm.polyhouse.zone.wateringTypePlaceholder"
                    )}
                    options={wateringType}
                  />
                </AntdForm.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Input
                  label={getTranslation(
                    "farm.createFarm.polyhouse.zone.wateringSchedule"
                  )}
                  name={`growingArea.wateringSchedule`}
                  rules={[
                    {
                      required: true,
                      message: `${getTranslation(
                        "farm.createFarm.polyhouse.zone.wateringScheduleMessage"
                      )}`,
                    },
                  ]}
                  placeholder={getTranslation(
                    "farm.createFarm.polyhouse.zone.wateringSchedulePlaceholder"
                  )}
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
