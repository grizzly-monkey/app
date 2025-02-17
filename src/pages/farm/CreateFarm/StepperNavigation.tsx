import Button from "@/components/common/button";
import routePaths from "@/config/routePaths";
import { removeByActionType } from "@/redux/error/errorAction";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import FarmActions from "@/redux/farm/action";
import requestingSelector from "@/redux/requesting/requestingSelector";
import { getTranslation } from "@/translation/i18n";
import { successToast } from "@/utilities/toast";
import { FormInstance } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Nursery, Zone } from "../types";
import { stepper, stepperNames } from "./const";

const selectError = makeSelectErrorModel();

interface stepperNavigationProps {
  current: number;
  setCurrent: (current: number) => void;
  form: FormInstance;
  reservoirForm: FormInstance;
  reservoirs: { key: number }[];
  polyhouses: { key: number; zones: Zone[]; nurseries: Nursery[] }[];
  farmValues: any;
  setFarmValues: any;
}

const StepperNavigation = ({
  current,
  setCurrent,
  form,
  reservoirs,
  polyhouses,
  reservoirForm,
  setFarmValues,
  farmValues,
}: stepperNavigationProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isFarmCreationDispatch, setIsFarmCreationDispatch] = useState(false);
  const [isPolyhouseDispatch, setIsPolyhouseDispatch] = useState(false);

  const farmCreationError = useSelector((state) =>
    selectError(state, FarmActions.ADD_FARM_FINISHED)
  );

  const polyhouseError = useSelector((state) =>
    selectError(state, FarmActions.ADD_POLYHOUSE_TO_FARM_FINISHED)
  );

  const farmLoading = useSelector((state) =>
    requestingSelector(state, [FarmActions.ADD_FARM])
  );

  const polyhouseLoading = useSelector((state) =>
    requestingSelector(state, [FarmActions.ADD_POLYHOUSE_TO_FARM])
  );

  useEffect(() => {
    if (!farmLoading && isFarmCreationDispatch) {
      if (!farmCreationError) {
        successToast("Farm is successfully created");
        dispatch(removeByActionType(FarmActions.ADD_FARM_FINISHED));
        setCurrent(current + 1);
      }
    }
  }, [farmLoading, farmCreationError, isFarmCreationDispatch]);

  useEffect(() => {
    if (!polyhouseLoading && isPolyhouseDispatch) {
      if (!polyhouseError) {
        successToast("Polyhouse added successfully");
        dispatch(
          removeByActionType(FarmActions.ADD_POLYHOUSE_TO_FARM_FINISHED)
        );
        navigate(routePaths.farm);
      }
    }
  }, [polyhouseLoading, polyhouseError, isPolyhouseDispatch]);

  const nextStep = () => {
    form
      .validateFields()
      .then(() => {
        setFarmValues(form.getFieldsValue());
        setCurrent(current + 1);
      })
      .catch(() => {});
  };
  const previousStep = () => setCurrent(current - 1);

  const goBack = () => {
    dispatch(removeByActionType(FarmActions.ADD_FARM_FINISHED));
    navigate(routePaths.farm);
  };

  const getReservoirsData = () => {
    const values = reservoirForm.getFieldsValue();
    const reservoirsData = reservoirs.map((_, index) => {
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
          .then((payload: any) => {
            dispatch(FarmActions.addFarm(payload));
            setIsFarmCreationDispatch(true);
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
      const polyhouseValues: any = {
        name: values[`name_${index}`],
        structureExpectedLife: parseFloat(
          values[`structureExpectedLife_${index}`]
        ),
        plasticExpectedLife: parseFloat(values[`plasticExpectedLife_${index}`]),
        zones: polyhouse.zones
          ? polyhouse.zones.map((zone) => {
              const updatedZone: any = { ...zone };
              delete updatedZone.key;
              return updatedZone;
            })
          : [],
        nurseries: polyhouse.nurseries
          ? polyhouse.nurseries.map((nursery) => {
              const updatedNursery: any = { ...nursery };
              delete updatedNursery.key;
              return updatedNursery;
            })
          : [],
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
        const payload: any = getPolyhousesData();
        dispatch(FarmActions.addPolyhousesToFarm(payload));
        setIsPolyhouseDispatch(true);
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
        <div style={{ width: "30%", display: "flex", gap: "10px" }}>
          <Button
            label={getTranslation("global.cancel")}
            onClick={goBack}
            loading={false}
            type="default"
          />
          <Button
            label={getTranslation("global.next")}
            onClick={nextStep}
            loading={false}
          />
        </div>
      )}

      {current === stepper[stepperNames.RESERVOIRS] && (
        <div style={{ width: "30%", display: "flex", gap: "10px" }}>
          <Button
            label={getTranslation("global.back")}
            onClick={previousStep}
            loading={false}
            type="default"
          />
          <Button
            className="btn-success"
            label={getTranslation("global.create")}
            onClick={farmCreate}
            loading={farmLoading}
          />
        </div>
      )}

      {current === stepper[stepperNames.POLYHOUSES] && (
        <div style={{ width: "30%", display: "flex", gap: "10px" }}>
          <Button
            label={getTranslation("global.cancel")}
            onClick={goBack}
            loading={false}
            type="default"
          />
          <Button
            className="btn-success"
            label={getTranslation("global.add")}
            onClick={addPolyHousesToFarm}
            loading={polyhouseLoading}
          />
        </div>
      )}
    </div>
  );
};

export default StepperNavigation;
