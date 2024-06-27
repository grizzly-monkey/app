import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form as AntdForm } from "antd";
import "./style.scss";
import { GrRefresh } from "react-icons/gr";
import Button from "@/components/common/button";
import Stepper from "./Stepper";
import { stepper, stepperNames } from "./const";
import AddFarm from "./Steps/AddFarm";
import AddReservoirs from "./Steps/AddReservoirs";
import AddPolyhouses from "./Steps/AddPolyhouses";
import StepperNavigation from "./StepperNavigation";
import Card from "@/components/ui/card";
import Form, { useForm } from "@/components/common/form";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import { makeRequestingSelector } from "@/redux/requesting/requestingSelector";
import FarmActions from "@/redux/farm/action";
import { applyErrorsToFields } from "./const";

const selectLoading = makeRequestingSelector();
const selectError = makeSelectErrorModel();

const CreateFarm = () => {
  const [form] = useForm();
  const [reservoirForm] = useForm();
  const [reservoirs, setReservoirs] = useState([{ key: 0 }]);
  const [polyhouses, setPolyhouses] = useState([
    { key: 0, zones: [], nurseries: [] },
  ]);
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
                [stepper[stepperNames.FARM_CREATION]]: <AddFarm form={form} />,
                [stepper[stepperNames.RESERVOIRS]]: (
                  <AddReservoirs
                    form={reservoirForm}
                    reservoirs={reservoirs}
                    setReservoirs={setReservoirs}
                  />
                ),
                [stepper[stepperNames.POLYHOUSES]]: (
                  <AddPolyhouses
                    form={form}
                    polyhouses={polyhouses}
                    setPolyhouses={setPolyhouses}
                  />
                ),
              }[current]
            }

            <StepperNavigation
              current={current}
              setCurrent={setCurrent}
              form={form}
              reservoirs={reservoirs}
              polyhouses={polyhouses}
              reservoirForm={reservoirForm}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateFarm;
