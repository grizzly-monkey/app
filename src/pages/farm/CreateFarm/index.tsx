import React, { useState } from "react";
import { Card, Divider } from "antd";
import "./style.scss";
import { GrRefresh } from "react-icons/gr";
import Button from "@/components/common/button";
import Stepper from "./Stepper";
import { stepper, stepperNames } from "./const";
import AddForm from "./Steps/AddForm";
import AddReservoirs from "./Steps/AddReservoirs";
import AddPolyhouses from "./Steps/AddPolyhouses";
import StepperNavigation from "./StepperNavigation";

const CreateFarm = () => {
  const [current, setCurrent] = useState(0);
  return (
    <div>
      <Card
        bordered={false}
        title="Farm creation"
        style={{ borderRadius: "10px", marginRight: "20px" }}
      >
        <div className="createForm">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Stepper current={current} setCurrent={setCurrent} />
            <Divider type="vertical" style={{ height: "100%" }} />
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
                [stepper[stepperNames.FARM_CREATION]]: <AddForm />,
                [stepper[stepperNames.RESERVOIRS]]: <AddReservoirs />,
                [stepper[stepperNames.POLYHOUSES]]: <AddPolyhouses />,
                // [stepper[stepperNames.COMPLETED]]: <Complete />,
              }[current]
            }
            {/* <StepperNavigation
              disabled={isStepperDisabled}
              setDisabled={setIsStepperDisabled}
              current={current}
              setCurrent={setCurrent}
              form={form}
              setTabError={setTabError}
            /> */}

            <StepperNavigation current={current} setCurrent={setCurrent} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateFarm;
