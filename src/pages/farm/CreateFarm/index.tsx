import React, { useState } from "react";
import { Form as AntdForm } from "antd";
import "./style.scss";
import { GrRefresh } from "react-icons/gr";
import Button from "@/components/common/button";
import Stepper from "./Stepper";
import { stepper, stepperNames } from "./const";
import AddForm from "./Steps/AddForm";
import AddReservoirs from "./Steps/AddReservoirs";
import AddPolyhouses from "./Steps/AddPolyhouses";
import StepperNavigation from "./StepperNavigation";
import Card from "@/components/ui/card";

const CreateFarm = () => {
  const [form] = AntdForm.useForm();
  const [current, setCurrent] = useState(0);
  return (
    <div>
      <Card
        bordered={false}
        title="Farm creation"
        style={{ borderRadius: "10px", marginRight: "20px" }}
      >
        <div className="createForm">
          <div className="stepper">
            <Stepper current={current} setCurrent={setCurrent} />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {
              {
                [stepper[stepperNames.FARM_CREATION]]: <AddForm form={form} />,
                [stepper[stepperNames.RESERVOIRS]]: (
                  <AddReservoirs form={form} />
                ),
                [stepper[stepperNames.POLYHOUSES]]: (
                  <AddPolyhouses form={form} />
                ),
              }[current]
            }

            <StepperNavigation
              current={current}
              setCurrent={setCurrent}
              form={form}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateFarm;
