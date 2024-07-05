import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Steps } from "antd";
import { FaRegUser } from "react-icons/fa";
import { FaTractor } from "react-icons/fa";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import FarmActions from "@/redux/farm/action";
import { getTranslation } from "@/translation/i18n";
import { errorDetail } from "@/types/error";

const selectError = makeSelectErrorModel();
const { Step } = Steps;

interface stepperProps {
  current: number;
  setCurrent: (current: number) => void;
}

const Stepper = ({ current, setCurrent }: stepperProps) => {
  const error = useSelector((state) =>
    selectError(state, FarmActions.ADD_FARM_FINISHED)
  );

  const [farmColor, setFarmColor] = useState("inherit");
  const [reservoirColor, setReservoirColor] = useState("inherit");

  const changeStep = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    let newFarmColor = "inherit";
    let newReservoirColor = "inherit";
    if (error) {
      error.errors.forEach((err: errorDetail) => {
        if (err.location.includes("reservoirs")) {
          newReservoirColor = "red";
        } else {
          newFarmColor = "red";
        }
      });

      setFarmColor(newFarmColor);
      setReservoirColor(newReservoirColor);
    } else {
      setFarmColor(newFarmColor);
      setReservoirColor(newReservoirColor);
    }
  }, [error]);

  const stepsComponent = (orientation: "horizontal" | "vertical") => (
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
        disabled={current === 2}
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
        disabled={current === 2}
      />
      <Step
        title={getTranslation("global.polyhouses")}
        description={
          <span>{getTranslation("farm.createFarm.configurePolyhouses")}</span>
        }
        icon={<FaRegUser />}
        disabled={current === 0 || current === 1}
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
