import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Collapse, Tabs } from "antd";
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

const selectError = makeSelectErrorModel();

const { Panel } = Collapse;
const { TabPane } = Tabs;

const AddPolyhouses = ({ form, polyhouses, setPolyhouses }) => {
  const error = useSelector((state) =>
    selectError(state, FarmActions.ADD_POLYHOUSE_TO_FARM_FINISHED)
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

  const deletePolyhouse = (key) => {
    setPolyhouses(polyhouses.filter((polyhouse) => polyhouse.key !== key));
  };

  const addZoneToPolyhouse = (polyhouseKey, newZone) => {
    setPolyhouses(
      polyhouses.map((polyhouse) => {
        if (polyhouse.key === polyhouseKey) {
          return { ...polyhouse, zones: [...polyhouse.zones, newZone] };
        }
        return polyhouse;
      })
    );
  };

  const addNurseryToPolyhouse = (polyhouseKey, newNursery) => {
    setPolyhouses(
      polyhouses.map((polyhouse) => {
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

  const updateZonesInPolyhouse = (polyhouseKey, updatedZones) => {
    setPolyhouses(
      polyhouses.map((polyhouse) => {
        if (polyhouse.key === polyhouseKey) {
          return { ...polyhouse, zones: updatedZones };
        }
        return polyhouse;
      })
    );
  };

  const updateNurseryInPolyhouse = (polyhouseKey, updatedNurseries) => {
    setPolyhouses(
      polyhouses.map((polyhouse) => {
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
                      name={`name_${index}`}
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
                      name={`structureExpectedLife_${index}`}
                      rules={[
                        {
                          required: true,
                          message: "Please input structure expected life",
                        },
                        {
                          pattern: REGEX.number,
                          message:
                            "Please provide valid structure expected life (e.g., 2, 2.5)",
                        },
                      ]}
                      placeholder="Enter structure expected life"
                    />
                  </Col>
                  <Col xs={24} sm={12}>
                    <Input
                      label="Plastic expected life"
                      name={`plasticExpectedLife_${index}`}
                      rules={[
                        {
                          required: true,
                          message: "Please input plastic expected life",
                        },
                        {
                          pattern: REGEX.number,
                          message:
                            "Please provide valid plastic expected life (e.g., 2, 2.5)",
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
                        <AddZones
                          polyhouseKey={polyhouse.key}
                          zones={polyhouse.zones}
                          addZone={addZoneToPolyhouse}
                          updateZones={updateZonesInPolyhouse}
                          errors={error ? error.errors : []}
                        />
                      </TabPane>
                      <TabPane tab="Configure nurseries" key="2">
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
