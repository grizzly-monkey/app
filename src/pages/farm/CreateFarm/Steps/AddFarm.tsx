import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Form as AntdForm } from "antd";
import Button from "@/components/common/button";
import Form from "@/components/common/form";
import Input from "@/components/common/input";
import PhoneInput from "@/components/common/input/phoneInput";
import Select from "@/components/ui/select";
import { REGEX, applyErrorsToFields } from "../const";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import FarmActions from "@/redux/farm/action";

const selectError = makeSelectErrorModel();

function AddFarm({ form }) {
  const error = useSelector((state) =>
    selectError(state, FarmActions.ADD_FARM_FINISHED)
  );

  useEffect(() => {
    if (error) {
      applyErrorsToFields(form, error.errors);
      error.errors.forEach((err) => {
        if (err.location.includes("nutrient.dilutionRatio")) {
          form.setFields([
            {
              name: "nutrientDilutionRatio",
              errors: [err.message || "Please enter valid value"],
              value: form.getFieldValue("nutrientDilutionRatio"),
            },
          ]);
        }
      });
    }
  }, [error]);

  const nutrientType = [
    {
      label: "2 part mix",
      value: "2 part mix",
    },
    {
      label: "3 part mix",
      value: "3 part mix",
    },
    {
      label: "Custom nutrient mix",
      value: "Custom nutrient mix",
    },
  ];

  return (
    <div className="addForm">
      <Form form={form} layout="vertical">
        <Row gutter={24}>
          <Col span={24}>
            <Input
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name",
                },
              ]}
              placeholder="Enter your name"
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Input
              label="Area (in sq meters)"
              name="area"
              rules={[
                {
                  required: true,
                  message: "Please input area",
                },
                {
                  pattern: REGEX.number,
                  message: "Please provide valid area (e.g., 20000, 200.5)",
                },
              ]}
              placeholder="Enter area (in sq meters)"
            />
          </Col>
          <Col xs={24} sm={12}>
            <AntdForm.Item
              label="Nutrients type"
              name="nutrientType"
              rules={[
                {
                  required: true,
                  message: "Please Select Nutrients type",
                },
              ]}
            >
              <Select
                placeholder="Select nutrients type"
                options={nutrientType}
              />
            </AntdForm.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Input
              label="Cultivable area (in sq meters)"
              name="cultivableArea"
              rules={[
                {
                  required: true,
                  message: "Please input cultivable area",
                },
                {
                  pattern: REGEX.number,
                  message:
                    "Please provide valid cultivable area (e.g., 20000, 200.5)",
                },
              ]}
              placeholder="Enter cultivable area (in sq meters)"
            />
          </Col>
          <Col xs={24} sm={12}>
            <Input
              label="Nutrient dilution ratio (e.g., 2:3)"
              name="nutrientDilutionRatio"
              rules={[
                {
                  required: true,
                  message: "Please input Nutrient dilution ratio",
                },
                {
                  pattern: REGEX.ratioValidationRegex,
                  message:
                    "Please provide farm dilution ratio in the format: numerator:denominator (e.g., 2:3)",
                },
              ]}
              placeholder="Enter Nutrient dilution ratio"
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AddFarm;
