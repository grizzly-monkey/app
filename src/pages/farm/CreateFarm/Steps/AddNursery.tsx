import { useState, useEffect } from "react";
import { Col, Row, Form as AntdForm } from "antd";
import Input from "@/components/common/input";
import Button from "@/components/common/button";
import Modal from "@/components/ui/modal";
import Form from "@/components/common/form";
import NuseryCard from "./NurseryCard";
import Select from "@/components/ui/select";
import { REGEX, applyErrorsToCardFields } from "../const";
import { getTranslation } from "@/translation/i18n";

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
      label: `${getTranslation(
        "farm.createFarm.polyhouse.nursery.nurseryType.openDome"
      )}`,
      value: "Open (no humidity control)",
    },
    {
      label: `${getTranslation(
        "farm.createFarm.polyhouse.nursery.nurseryType.closeDome"
      )}`,
      value: "Closed dome (humidity control)",
    },
  ];

  const nurseryGerminationType = [
    {
      label: `${getTranslation(
        "farm.createFarm.polyhouse.nursery.germinationType.trayWithCocoPeat"
      )}`,
      value: "Tray with coco peat",
    },
    {
      label: `${getTranslation(
        "farm.createFarm.polyhouse.nursery.germinationType.oasisCubies"
      )}`,
      value: "Oasis cubies",
    },
    {
      label: `${getTranslation(
        "farm.createFarm.polyhouse.nursery.germinationType.cocoPlugs"
      )}`,
      value: "Coco plugs",
    },
  ];

  const wateringType = [
    { label: `${getTranslation("global.manual")}`, value: "Manual" },
    { label: `${getTranslation("global.automatic")}`, value: "Automatic" },
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
        <Button
          label={getTranslation("farm.createFarm.polyhouse.nursery.addNursery")}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <NuseryCard
        nurseries={nurseries}
        onEdit={handleEdit}
        onDelete={handleDelete}
        errors={errors}
      />

      <Modal
        title={
          currentNursery
            ? getTranslation("farm.createFarm.polyhouse.nursery.editNursery")
            : getTranslation("farm.createFarm.polyhouse.nursery.addNursery")
        }
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        onClose={handleCancel}
        okText={currentNursery ? "Update" : "Add"}
        className="modal"
      >
        <Form form={form} layout="vertical" style={{ marginTop: "20px" }}>
          {/* <Card bordered={false} style={{ borderRadius: "10px" }}> */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Input
                label={getTranslation(
                  "farm.createFarm.polyhouse.nursery.nurseryName"
                )}
                name="name"
                rules={[
                  {
                    required: true,
                    message: `${getTranslation(
                      "farm.createFarm.polyhouse.nursery.nurseryNameMessage"
                    )}`,
                  },
                ]}
                placeholder={getTranslation(
                  "farm.createFarm.polyhouse.nursery.nurseryNamePlaceholder"
                )}
              />
            </Col>
            <Col xs={24} sm={12}>
              <AntdForm.Item
                label={getTranslation(
                  "farm.createFarm.polyhouse.nursery.nurseryType"
                )}
                name="type"
                rules={[
                  {
                    required: true,
                    message: `${getTranslation(
                      "farm.createFarm.polyhouse.nursery.nurseryTypeMessage"
                    )}`,
                  },
                ]}
              >
                <Select
                  placeholder={getTranslation(
                    "farm.createFarm.polyhouse.nursery.nurseryTypePlaceholder"
                  )}
                  options={nurseryType}
                />
              </AntdForm.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Input
                label={getTranslation(
                  "farm.createFarm.polyhouse.nursery.nurseryArea"
                )}
                name="area"
                rules={[
                  {
                    required: true,
                    message: `${getTranslation(
                      "farm.createFarm.polyhouse.nursery.nurseryAreaMessage"
                    )}`,
                  },
                  {
                    pattern: REGEX.number,
                    message: `${getTranslation(
                      "farm.createFarm.polyhouse.nursery.nurseryAreaRegexMessage"
                    )}`,
                  },
                ]}
                placeholder={getTranslation(
                  "farm.createFarm.polyhouse.nursery.nurseryAreaPlaceholder"
                )}
              />
            </Col>
            <Col xs={24} sm={12}>
              <AntdForm.Item
                label={getTranslation(
                  "farm.createFarm.polyhouse.nursery.germinationType"
                )}
                name="germinationType"
                rules={[
                  {
                    required: true,
                    message: `${getTranslation(
                      "farm.createFarm.polyhouse.nursery.germinationTypeMessage"
                    )}`,
                  },
                ]}
              >
                <Select
                  placeholder={getTranslation(
                    "farm.createFarm.polyhouse.nursery.germinationTypePlaceholder"
                  )}
                  options={nurseryGerminationType}
                />
              </AntdForm.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Input
                label={getTranslation(
                  "farm.createFarm.polyhouse.nursery.germinationArea"
                )}
                name="germinationArea"
                rules={[
                  {
                    required: true,
                    message: `${getTranslation(
                      "farm.createFarm.polyhouse.nursery.germinationAreaMessage"
                    )}`,
                  },
                  {
                    pattern: REGEX.number,
                    message: `${getTranslation(
                      "farm.createFarm.polyhouse.nursery.germinationAreaRegexMessage"
                    )}`,
                  },
                ]}
                placeholder={getTranslation(
                  "farm.createFarm.polyhouse.nursery.germinationAreaPlaceholder"
                )}
              />
            </Col>
            <Col xs={24} sm={12}>
              <Input
                label={getTranslation(
                  "farm.createFarm.polyhouse.nursery.seedCount"
                )}
                name="seedCount"
                rules={[
                  {
                    required: true,
                    message: `${getTranslation(
                      "farm.createFarm.polyhouse.nursery.seedCountMessage"
                    )}`,
                  },
                  {
                    pattern: REGEX.number,
                    message: `${getTranslation(
                      "farm.createFarm.polyhouse.nursery.seedCountRegexMessage"
                    )}`,
                  },
                ]}
                placeholder={getTranslation(
                  "farm.createFarm.polyhouse.nursery.seedCountPlaceholder"
                )}
              />
            </Col>
            <Col xs={24} sm={12}>
              <AntdForm.Item
                label={getTranslation(
                  "farm.createFarm.polyhouse.nursery.wateringType"
                )}
                name={`wateringType`}
                rules={[
                  {
                    required: true,
                    message: `${getTranslation(
                      "farm.createFarm.polyhouse.nursery.wateringTypeMessage"
                    )}`,
                  },
                ]}
              >
                <Select
                  placeholder={getTranslation(
                    "farm.createFarm.polyhouse.nursery.wateringTypePlaceholder"
                  )}
                  options={wateringType}
                />
              </AntdForm.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Input
                label={getTranslation(
                  "farm.createFarm.polyhouse.nursery.wateringSchedule"
                )}
                name="wateringSchedule"
                rules={[
                  {
                    required: true,
                    message: `${getTranslation(
                      "farm.createFarm.polyhouse.nursery.wateringScheduleMessage"
                    )}`,
                  },
                ]}
                placeholder={getTranslation(
                  "farm.createFarm.polyhouse.nursery.wateringSchedulePlaceholder"
                )}
              />
            </Col>
          </Row>
          {/* </Card> */}
        </Form>
      </Modal>
    </div>
  );
};

export default AddNursery;
