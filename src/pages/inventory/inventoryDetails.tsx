import CustomEdit from "@/components/common/CustomEditable/CustomEdit";
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
  const descriptionError = useSelector((state) =>
    selectError(state, InventoryActions.PATCH_INVENTORY_FINISHED, "description")
  );

  const selectedInventory = useSelector(
    InventorySelectors.selectSelectedInventory
  );

  const updateInventory = (data: any) => {
    dispatch(
      InventoryActions.patchInventory({
        data: { [data.fieldName]: data.value },
        id: selectedInventory?.inventoryId,
        scope: data.fieldName,
      })
    );
  };

  console.log("error", form.getFieldsValue());
  useEffect(()=>{
    if(descriptionError){
      form.setFields([
        {
          name: ["description"],
          value: form.getFieldValue(["description"]),
          errors: ['descriptionError'],
        },
      ]);
    }
  },[descriptionError])
  return (
    <Form form={form}>
      <div className="user-details-sidebar" style={{ width: "100%" }}>
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
                    onSubmit={() => console.log("submit")}
                    isActive={field.provider}
                    loading={false}
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
                    onSubmit={() => console.log("submit")}
                    isActive={field.quantity}
                    loading={false}
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
                    onSubmit={() => console.log("submit")}
                    isActive={field.wastage}
                    loading={false}
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
        {/* <table>
                    <tbody>
                        <tr >
                            <td>
                                <strong>
                                    First Name
                                </strong>
                            </td>
                            <td>
                               
                            </td>
                        </tr>
                        <tr>
                            <td><strong>
                                Last Name
                            </strong></td>
                            <td>
                            <CustomEdit
                                    form={form}
                                    name="lastName"
                                    onSubmit={updateLastName}
                                    isActive={field.lastName}
                                    loading={lastNameUdating}
                                    value={selectedUser?.firstName}
                                    setSubmitDisable={(value) => console.log(value)}
                                    onCancel={() => toggleField('lastName', false)}
                                    setActive={() => toggleField('lastName', true)}
                                    userDefineField={{ field: "input" }}

                                >
                                    {selectedUser?.lastName}
                                </CustomEdit>
                                </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>
                                    Contact Number
                                </strong>
                            </td>
                            <td>{selectedUser?.phone}</td>
                        </tr>
                        <tr >
                            <td>
                                <strong>
                                    Roles
                                </strong>
                            </td>
                            <td>
                                <CustomEdit
                                    form={form}
                                    name="roles"
                                    onSubmit={updateRoles}
                                    isActive={field.roles}
                                    loading={rolesUdating}
                                    value={[{ label: selectedUser?.role, value: selectedUser?.role}]}
                                    setSubmitDisable={(value) => console.log(value)}
                                    onCancel={() => toggleField('roles', false)}
                                    setActive={() => toggleField('roles', true)}
                                    userDefineField={{ options: roles}}
                                    type="multiple"
                                >
                                    {selectedUser?.role}
                                </CustomEdit>
                                </td>
                        </tr>
                    </tbody>
                </table> */}
      </div>
    </Form>
  );
};

export default InventoryDetails;
