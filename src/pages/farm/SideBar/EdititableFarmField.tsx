import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form as AntdForm } from "antd";
import PropTypes from "prop-types";
import Form from "@/components/common/form";
import CustomEdit from "@/components/common/CustomEditable/CustomEdit";
import FarmActions from "@/redux/farm/action";
import requestingSelector from "@/redux/requesting/requestingSelector";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import { applyErrorsToFields } from "../CreateFarm/const";

interface EditableFarmFieldProps {
  fieldName: string;
  value: string;
  placeholder?: string;
  farmId: string;
  isParseField?: boolean;
  customValidator?: () => void;
  udf?: object;
}

const selectError = makeSelectErrorModel();
const EditableFarmField = ({
  fieldName,
  value,
  placeholder,
  farmId,
  isParseField,
  customValidator,
  udf,
}: EditableFarmFieldProps) => {
  const dispatch = useDispatch();
  const [form] = AntdForm.useForm();

  const loading = useSelector((state) =>
    requestingSelector(state, [FarmActions.UPDATE_FARM], fieldName)
  );

  const error = useSelector((state) =>
    selectError(state, FarmActions.UPDATE_FARM_FINISHED, fieldName)
  );

  const [isActive, setIsActive] = useState(false);
  const [isSubmitDisable, setIsSubmitDisable] = useState(false);

  useEffect(() => {
    if (error) {
      applyErrorsToFields(form, error.errors);
      console.log("errors in useEffect", error, form, form.getFieldValue());
      error.errors.forEach((err) => {
        if (err.location.includes("nutrient.dilutionRatio")) {
          form.setFields([
            {
              name: fieldName[fieldName],
              errors: [err.message || "Please enter valid value"],
              value: form.getFieldValue(fieldName[fieldName]),
            },
          ]);
        }
      });
    }
  }, [error]);

  const updateFarm = (value) => {
    if (fieldName.includes("nutrient")) {
      const fieldArray = fieldName.split(".");
      let updatedValue = {
        nutrient: { [fieldArray[fieldArray.length - 1]]: value[fieldName] },
      };
      if (fieldName.includes("dilutionRatio")) {
        const [numerator, denominator] = value[fieldName]
          .split(":")
          .map(Number);
        updatedValue = {
          nutrient: {
            [fieldArray[fieldArray.length - 1]]: {
              numerator: parseInt(numerator),
              denominator: parseInt(denominator),
            },
          },
        };
      }
      dispatch(FarmActions.updateFarm(fieldName, updatedValue));
    } else dispatch(FarmActions.updateFarm(fieldName, value));
  };

  useEffect(() => {
    if (!loading) {
      if (!error) {
        setIsActive(false);
      } else {
        setIsSubmitDisable(true);
      }
    }
  }, [loading, error]);

  return (
    <Form form={form}>
      <CustomEdit
        form={form}
        name={fieldName}
        onSubmit={(value) =>
          updateFarm({ [fieldName]: isParseField ? parseFloat(value) : value })
        }
        isActive={isActive}
        loading={loading}
        value={value}
        placeholder={placeholder}
        setSubmitDisable={setIsSubmitDisable}
        onCancel={() => setIsActive(false)}
        setActive={() => setIsActive(!isActive)}
        userDefineField={{ ...udf, fieldId: farmId }}
        isSubmitDisable={isSubmitDisable}
        customValidator={customValidator}
      >
        {value}
      </CustomEdit>
    </Form>
  );
};

EditableFarmField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  farmId: PropTypes.string.isRequired,
  isParseField: PropTypes.bool,
  customValidator: PropTypes.func,
  udf: PropTypes.object,
};

EditableFarmField.defaultProps = {
  placeholder: "",
  isParseField: false,
  customValidator: () => Promise.resolve,
  udf: {},
};

export default EditableFarmField;
