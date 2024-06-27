import React, { useEffect, useState } from "react";
import { Popconfirm } from "antd";
import Button from "@/components/common/button";
import { useNavigate } from "react-router-dom";
import { stepper, stepperNames } from "./const";
import routePaths from "@/config/routePaths";
import { useDispatch } from "react-redux";
import FarmActions from "@/redux/farm/action";

const StepperNavigation = ({
  current,
  setCurrent,
  form,
  reservoirs,
  polyhouses,
  reservoirForm,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [farmValues, setFarmValues] = useState(null);

  const nextStep = () => {
    setFarmValues(form.getFieldsValue());
    setCurrent(current + 1);
  };
  const previousStep = () => setCurrent(current - 1);

  const goBack = () => {
    navigate(routePaths.farm);
  };

  const getReservoirsData = () => {
    const values = reservoirForm.getFieldsValue();
    const reservoirsData = reservoirs.map((reservoir, index) => {
      const reservoirValues = {
        name: values[`name_${index}`],
        reservoirCapacity: parseFloat(values[`reservoirCapacity_${index}`]),
        phReservoirCapacity: parseFloat(values[`phReservoirCapacity_${index}`]),
        nutrientWaterReservoirCapacity: parseFloat(
          values[`nutrientWaterReservoirCapacity_${index}`]
        ),
        stockNutrientSolutionCapacity: parseFloat(
          values[`stockNutrientSolutionCapacity_${index}`]
        ),
      };

      const filteredValues = Object.fromEntries(
        Object.entries(reservoirValues).filter(
          ([key, value]) =>
            key === "name" || (!isNaN(value) && value !== undefined)
        )
      );

      const allNumericValuesUndefinedOrNaN = Object.entries(reservoirValues)
        .filter(([key, _]) => key !== "name")
        .every(([_, value]) => isNaN(value) || value === undefined);

      if (allNumericValuesUndefinedOrNaN && !filteredValues.name) {
        return null;
      }

      return filteredValues;
    });

    const validReservoirsData = reservoirsData.filter(
      (reservoir) => reservoir !== null
    );

    if (validReservoirsData.length === 0) {
      return Promise.resolve([]);
    } else {
      return reservoirForm
        .validateFields()
        .then(() => validReservoirsData)
        .catch(() => {
          throw new Error("Reservoir validation failed");
        });
    }
  };

  const getFarmData = async () => {
    const { nutrientType, nutrientDilutionRatio, ...remainingFields } =
      farmValues;
    const [numerator, denominator] = nutrientDilutionRatio
      .split(":")
      .map(Number);
    const reservoirs = await getReservoirsData();

    const farmPayload = {
      name: remainingFields.name,
      type: remainingFields.type,
      nutrient: {
        type: nutrientType,
        dilutionRatio: {
          numerator: parseInt(numerator),
          denominator: parseInt(denominator),
        },
      },
      area: parseFloat(remainingFields.area),
      cultivableArea: parseFloat(remainingFields.cultivableArea),
      location: {
        address: "Pune",
        lat: 1.24,
        long: 1.24,
      },
    };

    return reservoirs.length === 0
      ? farmPayload
      : { ...farmPayload, reservoirs };
  };

  const farmCreate = () => {
    form
      .validateFields()
      .then(() => {
        getFarmData()
          .then((payload) => {
            dispatch(FarmActions.addFarm(payload));
          })
          .catch((error) => {
            console.error(error.message);
          });
      })
      .catch(() => {});
  };

  const getPolyhousesData = () => {
    const values = form.getFieldsValue();
    const polyhousesData = polyhouses.map((polyhouse, index) => {
      const polyhouseValues = {
        name: values[`name_${index}`],
        structureExpectedLife: parseFloat(
          values[`structureExpectedLife_${index}`]
        ),
        plasticExpectedLife: parseFloat(values[`plasticExpectedLife_${index}`]),
        zones: polyhouse.zones,
        nurseries: polyhouse.nurseries,
      };

      if (
        Array.isArray(polyhouseValues.zones) &&
        polyhouseValues.zones.length === 0
      ) {
        delete polyhouseValues.zones;
      }

      if (
        Array.isArray(polyhouseValues.nurseries) &&
        polyhouseValues.nurseries.length === 0
      ) {
        delete polyhouseValues.nurseries;
      }

      return polyhouseValues;
    });
    return polyhousesData;
  };

  const addPolyHousesToFarm = () => {
    form
      .validateFields()
      .then(() => {
        const payload = getPolyhousesData();
        dispatch(FarmActions.addPolyhousesToFarm(payload));
      })
      .catch(() => {});
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
          <Button label="Next" onClick={nextStep} />
        </div>
      )}

      {current === stepper[stepperNames.RESERVOIRS] && (
        <div style={{ width: "150px", display: "flex", gap: "10px" }}>
          <Button label="Back" onClick={previousStep} />
          <Button className="btn-success" label="Create" onClick={farmCreate} />
        </div>
      )}

      {current === stepper[stepperNames.POLYHOUSES] && (
        <div style={{ width: "150px", display: "flex", gap: "10px" }}>
          <Button label="Back" onClick={previousStep} />
          <Button label="Add" onClick={addPolyHousesToFarm} />
        </div>
      )}
    </div>
  );
};

export default StepperNavigation;
