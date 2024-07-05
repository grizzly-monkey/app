import CustomEdit from "@/components/common/CustomEditable/CustomEdit";
import FullAlertError from "@/components/common/error/FullAlertError";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import InventoryActions from "@/redux/inventory/actions";
import InventorySelectors from "@/redux/inventory/selectors";
import requestingSelector from "@/redux/requesting/requestingSelector";
import { getTranslation } from "@/translation/i18n";
import Fields from "@/utilities/fields/field";
import { Form, FormInstance } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface inventoryDetailsProps {
  toggleField: Function;
  field: Record<string, boolean>;
  form: FormInstance;
}

const selectError = makeSelectErrorModel();
const InventoryDetails = ({
  toggleField,
  field,
  form,
}: inventoryDetailsProps) => {
  const [descriptionSubmitDisable, setDescriptionSubmitDisable] = useState(false);
  const [providerSubmitDisable, setProviderSubmitDisable] = useState(false);
  const [quantitySubmitDisable, setQuantitySubmitDisable] = useState(false);
  const [wastageSubmitDisable, setWastageSubmitDisable] = useState(false);
  const dispatch = useDispatch();
  const descriptionUdating = useSelector((state) =>
    requestingSelector(state, [InventoryActions.PATCH_INVENTORY], "description")
  );

  const providerUdating = useSelector((state) =>
    requestingSelector(state, [InventoryActions.PATCH_INVENTORY], "provider")
  );

  const quantityUdating = useSelector((state) =>
    requestingSelector(state, [InventoryActions.PATCH_INVENTORY], "quantity")
  );

  const wastageUdating = useSelector((state) =>
    requestingSelector(state, [InventoryActions.PATCH_INVENTORY], "wastage")
  );

  const descriptionError = useSelector((state) =>
    selectError(state, InventoryActions.PATCH_INVENTORY_FINISHED, "description")
  );

  const providerError = useSelector((state) =>
    selectError(state, InventoryActions.PATCH_INVENTORY_FINISHED, "provider")
  );

  const quantityError = useSelector((state) =>
    selectError(state, InventoryActions.PATCH_INVENTORY_FINISHED, "quantity")
  );

  const wastageError = useSelector((state) =>
    selectError(state, InventoryActions.PATCH_INVENTORY_FINISHED, "wastage")
  );

  const selectedInventory = useSelector(
    InventorySelectors.selectSelectedInventory
  );

  const updateInventory = (data: any) => {
    const intitalData = {
      description: selectedInventory?.description,
      provider: selectedInventory?.provider,
      quantity: selectedInventory?.quantity,
      wastage: selectedInventory?.wastage,
    };
    dispatch(
      InventoryActions.patchInventory({
        data: { ...intitalData, ...{ [data.fieldName]: data.value } },
        id: selectedInventory?.inventoryId,
        scope: data.fieldName,
      })
    );
  };

  useEffect(() => {
    if (!descriptionUdating) {
      if (!descriptionError) {
        toggleField("description", false);
      } else{
        setDescriptionSubmitDisable(true);
      }
    }
  }, [descriptionError, descriptionUdating]);
  useEffect(() => {
    if (!providerUdating) {
      if (!providerError) {
        toggleField("provider", false);
      }else{
        setProviderSubmitDisable(true);
      }
    }
  }, [providerUdating, providerError]);

  useEffect(() => {
    if (!quantityUdating) {
      if (!quantityError) {
        toggleField("quantity", false);
      }else{
        setQuantitySubmitDisable(true);
      }
    }
  }, [quantityUdating, quantityError]);
  useEffect(() => {
    if (!wastageUdating) {
      if (!wastageError) {
        toggleField("wastage", false);
      }else{
        setWastageSubmitDisable(true);
      }
    }
  }, [wastageUdating, wastageError]);

  return (
    <Form form={form}>
      <div className="user-details-sidebar" style={{ width: "100%" }}>
        <>{descriptionError && <FullAlertError error={descriptionError} />}</>
        <>{providerError && <FullAlertError error={providerError} />}</>
        <>{quantityError && <FullAlertError error={quantityError} />}</>
        <>{wastageError && <FullAlertError error={wastageError} />}</>
        <Fields
          info={[
            {
              label: "Description",
              value: (
                <div style={{ minHeight: "40px" }}>
                  <CustomEdit
                    form={form}
                    name="description"
                    onSubmit={(value) =>
                      updateInventory({
                        fieldName: "description",
                        value: value,
                      })
                    }
                    isActive={field.description}
                    loading={descriptionUdating}
                    value={selectedInventory?.description}
                    setSubmitDisable={setDescriptionSubmitDisable}
                    onCancel={() => toggleField("description", false)}
                    setActive={() => toggleField("description", true)}
                    userDefineField={{
                      inputDataTestId: "first-name-input",
                    }}
                    isSubmitDisable={descriptionSubmitDisable}
                    containerDataTestId="first-name-container"
                    placeholder={getTranslation("global.description")}
                  >
                    {selectedInventory.description? selectedInventory.description : "No description"}
                  </CustomEdit>
                </div>
              ),
            },
            {
              label: "Provider",
              value: (
                <div style={{  minHeight: "40px" }}>
                  <CustomEdit
                    form={form}
                    name="provider"
                    onSubmit={(value) =>
                      updateInventory({ fieldName: "provider", value: value })
                    }
                    isActive={field.provider}
                    loading={providerUdating}
                    value={selectedInventory?.provider}
                    setSubmitDisable={setProviderSubmitDisable}
                    isSubmitDisable={providerSubmitDisable}
                    onCancel={() => toggleField("provider", false)}
                    setActive={() => toggleField("provider", true)}
                    userDefineField={{
                      inputDataTestId: "last-name-input",
                      rules:[{
                        required: true,
                        message: "Please enter provider"
                      
                      }]
                    }}
                    containerDataTestId="last-name-container"
                    placeholder={getTranslation(
                      "inventoryManagement.providerPlaceholder"
                    )}
                  >
                    {selectedInventory?.provider}
                  </CustomEdit>
                </div>
              ),
            },
            {
              label: "Quantity",
              value: (
                <div style={{  minHeight: "40px" }}>
                  <CustomEdit
                    form={form}
                    type="int"
                    name="quantity"
                    onSubmit={(value) =>
                      updateInventory({ fieldName: "quantity", value: value })
                    }
                    
                    isActive={field.quantity}
                    loading={quantityUdating}
                    value={selectedInventory?.quantity}
                    setSubmitDisable={setQuantitySubmitDisable}
                    isSubmitDisable={quantitySubmitDisable}
                    onCancel={() => toggleField("quantity", false)}
                    setActive={() => toggleField("quantity", true)}
                    userDefineField={{
                      rules:[{
                        required: true,
                        message: "Please enter quantity"
                      }],
                      type: "INT",
                      inputDataTestId: "quantity-input",
                    }}
                    containerDataTestId="quantity-container"
                    placeholder={getTranslation(
                      "inventoryManagement.quantityPlaceholder"
                    )}
                  >
                    {`${selectedInventory?.quantity} ${selectedInventory.unit}` }
                  </CustomEdit>
                </div>
              ),
            },
            {
              label: "Wastage",
              value: (
                <div style={{  minHeight: "40px" }}>
                  <CustomEdit
                    type="int"
                    form={form}
                    name="wastage"
                    onSubmit={(value) =>
                      updateInventory({ fieldName: "wastage", value: value })
                    }

                    isActive={field.wastage}
                    loading={wastageUdating}
                    value={selectedInventory?.wastage}
                    setSubmitDisable={setWastageSubmitDisable}
                    isSubmitDisable={wastageSubmitDisable}
                    onCancel={() => toggleField("wastage", false)}
                    setActive={() => toggleField("wastage", true)}
                    userDefineField={{
                      rules:[{
                        required: true,
                        message: "Please enter wastage"
                      }],
                      inputDataTestId: "wastage-input",
                    }}
                    containerDataTestId="wastage-container"
                    placeholder={getTranslation(
                      "inventoryManagement.wastagePlaceholder"
                    )}
                  >
                    {`${selectedInventory?.wastage} ${selectedInventory.unit}`}
                  </CustomEdit>
                </div>
              ),
            },
          ]}
        />
      </div>
    </Form>
  );
};

export default InventoryDetails;
