import CustomEdit from "@/components/common/CustomEditable/CustomEdit";
import Form from "@/components/common/form";
import UserSelectors from "@/redux/user/selectors";
import { FormInstance } from "antd";
import { useSelector } from "react-redux";

interface userDetailsProps {
    toggleField: Function;
    field: Record<string, boolean>;
    form: FormInstance
}

const UserDetails = ({ toggleField, field, form }: userDetailsProps) => {
    const selectedUser = useSelector(UserSelectors.selectSelectedUser)

    return (
        <Form form={form}>
            <div className="user-details-sidebar" style={{ width: '100%' }}>
                <table>
                    <tbody>
                        <tr >
                            <td>
                                <strong>
                                    First Name
                                </strong>
                            </td>
                            <td>
                                <CustomEdit
                                    form={form}
                                    name="firstName"
                                    onSubmit={(value) => console.log("customEdit", value)}
                                    isActive={field.firstName}
                                    loading={false}
                                    value={selectedUser?.firstName}
                                    setSubmitDisable={(value) => console.log(value)}
                                    onCancel={() => toggleField('firstName', false)}
                                    setActive={() => toggleField('firstName', true)}
                                    userDefineField={{ field: "firstName" }}

                                >
                                    {selectedUser?.firstName}
                                </CustomEdit>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>
                                Last Name
                            </strong></td>
                            <td>
                            <CustomEdit
                                    form={form}
                                    name="firstName"
                                    onSubmit={(value) => console.log("customEdit", value)}
                                    isActive={field.lastName}
                                    loading={false}
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
                                    name="role"
                                    onSubmit={(value) => console.log("customEdit", value)}
                                    isActive={field.roles}
                                    loading={false}
                                    value={selectedUser?.role}
                                    setSubmitDisable={(value) => console.log(value)}
                                    onCancel={() => toggleField('roles', false)}
                                    setActive={() => toggleField('roles', true)}
                                    userDefineField={{ field: "input" }}
                                >
                                    {selectedUser?.role}
                                </CustomEdit>
                                </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Form>
    );
}

export default UserDetails;