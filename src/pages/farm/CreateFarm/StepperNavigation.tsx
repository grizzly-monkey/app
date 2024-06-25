import React, { useEffect } from "react";
import { Popconfirm } from "antd";
import Button from "@/components/common/button";
import { useNavigate } from "react-router-dom";
import { stepper, stepperNames } from "./const";
import routePaths from "@/config/routePaths";
import { useDispatch } from "react-redux";
import FarmActions from "@/redux/farm/action";

const StepperNavigation = ({ current, setCurrent, form }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nextStep = () => {
    setCurrent(current + 1);
  };
  const previousStep = () => setCurrent(current - 1);

  const goBack = () => {
    navigate(routePaths.farm);
  };

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       // const lat = position.coords.latitude;
  //       // const lng = position.coords.longitude;
  //       console.log("position", position);
  //     });
  //   } else {
  //     console.log("no geo locator");
  //   }
  // }, []);

  const farmCreate = () => {
    form
      .validateFields()
      .then(() => dispatch(FarmActions.addFarm(form.getFieldsValue())))
      .catch(() => {});
    console.log("fram creation", form.getFieldsValue());
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "10px",
      }}
    >
      {current === stepper[stepperNames.FARM_CREATION] && (
        <div style={{ width: "150px", display: "flex", gap: "10px" }}>
          <Button label="Cancel" onClick={{ goBack }} />
          <Button className="btn-success" label="Create" onClick={farmCreate} />
        </div>
      )}

      {current === stepper[stepperNames.RESERVOIRS] && (
        <div style={{ width: "150px", display: "flex", gap: "10px" }}>
          <Button label="Back" onClick={previousStep} />
          <Button label="Next" onClick={nextStep} />
        </div>
      )}

      {current === stepper[stepperNames.POLYHOUSES] && (
        <div style={{ width: "150px", display: "flex", gap: "10px" }}>
          <Button label="Back" onClick={previousStep} />
          <Button label="Ok" onClick={nextStep} />
        </div>
      )}
    </div>
  );
};

export default StepperNavigation;
