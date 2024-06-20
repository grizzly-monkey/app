import React from "react";
import { Steps } from "antd";
import { FaRegUser } from "react-icons/fa";
import { FaTractor } from "react-icons/fa";

const { Step } = Steps;

const Stepper = ({ current, setCurrent }) => {
  const changeStep = (index) => {
    setCurrent(index);
  };

  const stepsComponent = (orientaion) => (
    <Steps
      current={current}
      onChange={changeStep}
      direction={orientaion}
      size="default"
      style={{ height: "100%", width: "100%" }}
    >
      <Step title="Farm" description="farm details" icon={<FaTractor />} />
      <Step
        title="Reservoirs"
        description="Configure reservoirs"
        icon={<FaRegUser />}
      />
      <Step
        title="Polyhouse"
        description={<span>Configure polyhouse, zone, nursery</span>}
        icon={<FaRegUser />}
      />
    </Steps>
  );

  return (
    <div>
      <div className="stepperVertical">{stepsComponent("vertical")}</div>
      <div className="stepperHorizontal">{stepsComponent("horizontal")}</div>
    </div>
  );
};

export default Stepper;
