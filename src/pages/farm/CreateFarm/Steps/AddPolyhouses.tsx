import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Tabs } from "antd";
import Button from "@/components/common/button";
import Form from "@/components/common/form";
import Input from "@/components/common/input";
import Card from "@/components/ui/card";
import { MdDelete } from "react-icons/md";
import AddZones from "./AddZones";
import AddNursery from "./AddNursery";
import { REGEX, applyErrorsToFields } from "../const";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import FarmActions from "@/redux/farm/action";
import { getTranslation } from "@/translation/i18n";

const selectError = makeSelectErrorModel();

const { TabPane } = Tabs;

const AddPolyhouses = ({ form, polyhouses, setPolyhouses }: any) => {
  const error = useSelector((state) =>
    selectError(state, FarmActions.ADD_POLYHOUSE_TO_FARM_FINISHED)
  );

  const hasZoneErrors = (key: string) =>
    error?.errors?.some((err: any) => err.location.includes(`zones.${key}`));

  const hasNursaryErrors = (key: string) =>
    error?.errors?.some((err: any) =>
      err.location.includes(`nurseries.${key}`)
    );

  useEffect(() => {
    if (error) applyErrorsToFields(form, error.errors);
  }, [error]);
  const addPolyhouse = () => {
    setPolyhouses([
      ...polyhouses,
      { key: polyhouses.length, zones: [], nurseries: [] },
    ]);
  };

  const deletePolyhouse = (key: any) => {
    setPolyhouses(polyhouses.filter((polyhouse: any) => polyhouse.key !== key));

    const updatedFields = { ...form.getFieldsValue() };
    Object.keys(updatedFields).forEach((field) => {
      if (field.includes(`_${key}`)) {
        delete updatedFields[field];
      }
    });
    form.resetFields();
    form.setFieldsValue(updatedFields);
  };

  const addZoneToPolyhouse = (polyhouseKey: any, newZone: any) => {
    setPolyhouses(
      polyhouses.map((polyhouse: any) => {
        if (polyhouse.key === polyhouseKey) {
          return { ...polyhouse, zones: [...polyhouse.zones, newZone] };
        }
        return polyhouse;
      })
    );
  };

  const addNurseryToPolyhouse = (polyhouseKey: any, newNursery: any) => {
    setPolyhouses(
      polyhouses.map((polyhouse: any) => {
        if (polyhouse.key === polyhouseKey) {
          return {
            ...polyhouse,
            nurseries: [...polyhouse.nurseries, newNursery],
          };
        }
        return polyhouse;
      })
    );
  };

  const updateZonesInPolyhouse = (polyhouseKey: any, updatedZones: any) => {
    setPolyhouses(
      polyhouses.map((polyhouse: any) => {
        if (polyhouse.key === polyhouseKey) {
          return { ...polyhouse, zones: updatedZones };
        }
        return polyhouse;
      })
    );
  };

  const updateNurseryInPolyhouse = (
    polyhouseKey: any,
    updatedNurseries: any
  ) => {
    setPolyhouses(
      polyhouses.map((polyhouse: any) => {
        if (polyhouse.key === polyhouseKey) {
          return { ...polyhouse, nurseries: updatedNurseries };
        }
        return polyhouse;
      })
    );
  };

  return (
    <div className="addForm">
      <div style={{ width: "150px", marginLeft: "auto" }}>
        <Button
          label={getTranslation("farm.createFarm.polyhouse.addPolyhouse")}
          onClick={addPolyhouse}
          loading={false}
        />
      </div>
      <div className="reservoir">
        <Form form={form} layout="vertical">
          {polyhouses.map((polyhouse: any, index: any) => (
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
                      label={getTranslation("farm.createFarm.polyhouse.name")}
                      name={`name_${index}`}
                      rules={[
                        {
                          required: true,
                          message: `${getTranslation(
                            "farm.createFarm.polyhouse.nameMessage"
                          )}`,
                        },
                      ]}
                      placeholder={getTranslation(
                        "farm.createFarm.polyhouse.namePlaceholder"
                      )}
                    />
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Input
                      label={getTranslation(
                        "farm.createFarm.polyhouse.structureExpectedLife"
                      )}
                      name={`structureExpectedLife_${index}`}
                      rules={[
                        {
                          required: true,
                          message: `${getTranslation(
                            "farm.createFarm.polyhouse.structureExpectedLifeMessage"
                          )}`,
                        },
                        {
                          pattern: REGEX.number,
                          message: `${getTranslation(
                            "farm.createFarm.polyhouse.structureExpectedLifeRegexMessage"
                          )}`,
                        },
                      ]}
                      placeholder={getTranslation(
                        "farm.createFarm.polyhouse.structureExpectedLifePlaceholder"
                      )}
                    />
                  </Col>
                  <Col xs={24} sm={12}>
                    <Input
                      label={getTranslation(
                        "farm.createFarm.polyhouse.plasticExpectedLife"
                      )}
                      name={`plasticExpectedLife_${index}`}
                      rules={[
                        {
                          required: true,
                          message: `${getTranslation(
                            "farm.createFarm.polyhouse.plasticExpectedLifeMessage"
                          )}`,
                        },
                        {
                          pattern: REGEX.number,
                          message: `${getTranslation(
                            "farm.createFarm.polyhouse.plasticExpectedLifeRegexMessage"
                          )}`,
                        },
                      ]}
                      placeholder={getTranslation(
                        "farm.createFarm.polyhouse.plasticExpectedLifePlaceholder"
                      )}
                    />
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={24}>
                    <Tabs defaultActiveKey="1">
                      <TabPane
                        tab={
                          <div
                            style={{
                              color: hasZoneErrors(index) ? "red" : "inherit",
                            }}
                          >
                            {getTranslation(
                              "farm.createFarm.polyhouse.configureZones"
                            )}
                          </div>
                        }
                        key="1"
                      >
                        <AddZones
                          polyhouseKey={polyhouse.key}
                          zones={polyhouse.zones}
                          addZone={addZoneToPolyhouse}
                          updateZones={updateZonesInPolyhouse}
                          errors={error ? error.errors : []}
                        />
                      </TabPane>
                      <TabPane
                        tab={
                          <div
                            style={{
                              color: hasNursaryErrors(index)
                                ? "red"
                                : "inherit",
                            }}
                          >
                            {getTranslation(
                              "farm.createFarm.polyhouse.configureNurseries"
                            )}
                          </div>
                        }
                        key="2"
                      >
                        <AddNursery
                          polyhouseKey={polyhouse.key}
                          nurseries={polyhouse.nurseries}
                          addNursery={addNurseryToPolyhouse}
                          updateNurseries={updateNurseryInPolyhouse}
                          errors={error ? error.errors : []}
                        />
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
