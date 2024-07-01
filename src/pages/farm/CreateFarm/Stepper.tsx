import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Steps } from "antd";
import { FaRegUser } from "react-icons/fa";
import { FaTractor } from "react-icons/fa";
import { applyErrorsToFields } from "../const";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import FarmActions from "@/redux/farm/action";
import { getTranslation } from "@/translation/i18n";

const selectError = makeSelectErrorModel();
const { Step } = Steps;

const Stepper = ({ current, setCurrent }) => {
  const error = useSelector((state) =>
    selectError(state, FarmActions.ADD_FARM_FINISHED)
  );

  const [farmColor, setFarmColor] = useState("inherit");
  const [reservoirColor, setReservoirColor] = useState("inherit");

  const changeStep = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (error) {
      let newFarmColor = "inherit";
      let newReservoirColor = "inherit";

      error.errors.forEach((err) => {
        if (err.location.includes("reservoirs")) {
          newReservoirColor = "red";
        } else {
          newFarmColor = "red";
        }
      });

      setFarmColor(newFarmColor);
      setReservoirColor(newReservoirColor);
    }
  }, [error]);

  const stepsComponent = (orientation) => (
    <Steps
      current={current}
      onChange={changeStep}
      direction={orientation}
      size="default"
      style={{ height: "100%", width: "100%" }}
    >
      <Step
        title={
          <span style={{ color: farmColor }}>
            {getTranslation("global.farm")}
          </span>
        }
        description={
          <span style={{ color: farmColor }}>
            {getTranslation("farm.createFarm.farmDetails")}
          </span>
        }
        icon={<FaTractor style={{ color: farmColor }} />}
      />
      <Step
        title={
          <span style={{ color: reservoirColor }}>
            {getTranslation("global.reservoirs")}
          </span>
        }
        description={
          <span style={{ color: reservoirColor }}>
            {getTranslation("farm.createFarm.configureReservoirs")}
          </span>
        }
        icon={<FaRegUser style={{ color: reservoirColor }} />}
      />
      <Step
        title={getTranslation("global.polyhouses")}
        description={
          <span>{getTranslation("farm.createFarm.configurePolyhouses")}</span>
        }
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
