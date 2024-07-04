import FarmSelectors from "@/redux/farm/FarmSelectors";
import UserSelectors from "@/redux/user/selectors";
import Fields from "@/utilities/fields/field";
import { useSelector } from "react-redux";
import moment from "moment";
import { getTranslation } from "@/translation/i18n";
import { deviceValue } from "../utilities";
import EditableFarmField from "./EdititableFarmField";
import { numberValidator, ratioValidationRegex } from "../CreateFarm/const";
import { User } from "@/pages/userManagement/types";

const FarmDetails = () => {
  const selectedFarm = useSelector(FarmSelectors.SelectSelectedFarm);
  const users = useSelector(UserSelectors.selectUsers);

  const getSelectedUser = (userId: string) => {
    let selectedUserName = "";
    users.forEach((user: User) => {
      if (user.userId === userId)
        selectedUserName = `${user.firstName} ${user.lastName}`;
    });

    return selectedUserName;
  };

  const nutrientType = [
    {
      label: `${getTranslation(
        "farm.createFarm.addFarm.nutrientType2PartMix"
      )}`,
      value: "2 part mix",
    },
    {
      label: `${getTranslation(
        "farm.createFarm.addFarm.nutrientType3PartMix"
      )}`,
      value: "3 part mix",
    },
    {
      label: `${getTranslation(
        "farm.createFarm.addFarm.nutrientTypeCustomNutrientMix"
      )}`,
      value: "Custom nutrient mix",
    },
  ];

  const fileds = [
    {
      label: `${getTranslation("global.name")}`,
      value: (
        <EditableFarmField
          fieldName="name"
          value={selectedFarm?.name}
          placeholder="Enter the name"
          farmId={selectedFarm.farmId}
          data-testid="editable-farm-field-name"
        >
          {selectedFarm?.name}
        </EditableFarmField>
      ),
    },
    {
      label: `${getTranslation("farm.farmArea")}`,
      value: (
        <EditableFarmField
          fieldName="area"
          value={`${selectedFarm?.area}`}
          placeholder="Enter the area"
          farmId={selectedFarm.farmId}
          isParseField={true}
          customValidator={numberValidator}
        >
          {selectedFarm?.area}
        </EditableFarmField>
      ),
    },
    {
      label: `${getTranslation("farm.cultivableArea")}`,
      value: (
        <EditableFarmField
          fieldName="cultivableArea"
          value={`${selectedFarm?.cultivableArea}`}
          placeholder="Enter the cultivable area"
          farmId={selectedFarm.farmId}
          isParseField={true}
          customValidator={numberValidator}
        >
          {selectedFarm?.cultivableArea}
        </EditableFarmField>
      ),
    },
    {
      label: `${getTranslation("farm.nutrientType")}`,
      value: (
        <EditableFarmField
          fieldName="nutrient.type"
          value={selectedFarm?.nutrient?.type}
          placeholder="Enter the nutrient type"
          farmId={selectedFarm.farmId}
          udf={{
            options: nutrientType,
            onlyFromLov: true,
            listOfValues: nutrientType,
          }}
        >
          {selectedFarm?.nutrient?.type}
        </EditableFarmField>
      ),
    },
    {
      label: `${getTranslation("farm.dilutionRatio")}`,
      value: (
        <EditableFarmField
          fieldName="nutrient.dilutionRatio"
          value={
            selectedFarm?.nutrient?.dilutionRatio
              ? selectedFarm.nutrient.dilutionRatio?.numerator +
                ":" +
                selectedFarm.nutrient.dilutionRatio?.denominator
              : "-"
          }
          placeholder="Enter the dilution ratio"
          farmId={selectedFarm.farmId}
          customValidator={ratioValidationRegex}
        >
          {selectedFarm?.nutrient?.dilutionRatio
            ? selectedFarm.nutrient.dilutionRatio?.numerator +
              ":" +
              selectedFarm.nutrient.dilutionRatio?.denominator
            : "-"}
        </EditableFarmField>
      ),
    },
    {
      label: `${getTranslation("global.reservoirs")}`,
      value: (
        <span>
          {selectedFarm?.reservoirs ? selectedFarm.reservoirs.length : "-"}
        </span>
      ),
    },
    {
      label: `${getTranslation("global.polyhouses")}`,
      value: (
        <span>
          {selectedFarm?.polyhouses ? selectedFarm.polyhouses.length : "-"}
        </span>
      ),
    },
    {
      label: `${getTranslation("farm.deviceStatus")}`,
      value: <span>{deviceValue(selectedFarm?.device)}</span>,
    },
    {
      label: `${getTranslation("global.createBy")}`,
      value: <span>{getSelectedUser(selectedFarm?.createdBy)}</span>,
    },
    {
      label: `${getTranslation("global.createdDate")}`,
      value: (
        <span>
          {selectedFarm?.createdDate
            ? moment(new Date(selectedFarm.createdDate)).format("DD-MM-YYYY")
            : "-"}
        </span>
      ),
    },
    {
      label: `${getTranslation("global.updatedBy")}`,
      value: <span>{getSelectedUser(selectedFarm?.updatedBy)}</span>,
    },
    {
      label: `${getTranslation("global.updatedDate")}`,
      value: (
        <span>
          {selectedFarm?.updatedDate
            ? moment(new Date(selectedFarm.updatedDate)).format("DD-MM-YYYY")
            : "-"}
        </span>
      ),
    },
  ];

  return (
    <>
      <Fields info={fileds} />
    </>
  );
};

export default FarmDetails;
