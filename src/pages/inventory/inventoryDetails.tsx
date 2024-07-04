import CustomEdit from "@/components/common/CustomEditable/CustomEdit";
import FullAlertError from "@/components/common/error/FullAlertError";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import InventoryActions from "@/redux/inventory/actions";
import InventorySelectors from "@/redux/inventory/selectors";
import requestingSelector from "@/redux/requesting/requestingSelector";
import Fields from "@/utilities/fields/field";
import { Form, FormInstance } from "antd";
import { useEffect } from "react";
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
      }
    }
  }, [descriptionError, descriptionUdating]);
  useEffect(() => {
    if (!providerUdating) {
      if (!providerError) {
        toggleField("provider", false);
      }
    }
  }, [providerUdating, providerError]);

  useEffect(() => {
    if (!quantityUdating) {
      if (!quantityError) {
        toggleField("quantity", false);
      }
    }
  }, [quantityUdating, quantityError]);
  useEffect(() => {
    if (!wastageUdating) {
      if (!wastageError) {
        toggleField("wastage", false);
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
                <div style={{ height: "40px" }}>
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
                    setSubmitDisable={(value) => console.log(value)}
                    onCancel={() => toggleField("description", false)}
                    setActive={() => toggleField("description", true)}
                    userDefineField={{
                      inputDataTestId: "first-name-input",
                    }}
                    containerDataTestId="first-name-container"
                  >
                    {selectedInventory?.description}
                  </CustomEdit>
                </div>
              ),
            },
            {
              label: "Provider",
              value: (
                <div style={{ height: "40px" }}>
                  <CustomEdit
                    form={form}
                    name="provider"
                    onSubmit={(value) =>
                      updateInventory({ fieldName: "provider", value: value })
                    }
                    isActive={field.provider}
                    loading={providerUdating}
                    value={selectedInventory?.provider}
                    setSubmitDisable={(value) => console.log(value)}
                    onCancel={() => toggleField("provider", false)}
                    setActive={() => toggleField("provider", true)}
                    userDefineField={{
                      inputDataTestId: "last-name-input",
                    }}
                    containerDataTestId="last-name-container"
                  >
                    {selectedInventory?.provider}
                  </CustomEdit>
                </div>
              ),
            },
            {
              label: "Quantity",
              value: (
                <div style={{ height: "40px" }}>
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
                    setSubmitDisable={(value) => console.log(value)}
                    onCancel={() => toggleField("quantity", false)}
                    setActive={() => toggleField("quantity", true)}
                    userDefineField={{
                      type: "INT",
                      inputDataTestId: "quantity-input",
                    }}
                    containerDataTestId="quantity-container"
                  >
                    {selectedInventory?.quantity}
                  </CustomEdit>
                </div>
              ),
            },
            {
              label: "Wastage",
              value: (
                <div style={{ height: "40px" }}>
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
                    setSubmitDisable={(value) => console.log(value)}
                    onCancel={() => toggleField("wastage", false)}
                    setActive={() => toggleField("wastage", true)}
                    userDefineField={{
                      inputDataTestId: "wastage-input",
                    }}
                    containerDataTestId="wastage-container"
                  >
                    {selectedInventory?.wastage}
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
