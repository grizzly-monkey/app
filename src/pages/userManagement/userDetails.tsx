import CustomEdit from "@/components/common/CustomEditable/CustomEdit";
import Form from "@/components/common/form";
import UserSelectors from "@/redux/user/selectors";
import { FormInstance } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { roles } from "./utils";
import requestingSelector from "@/redux/requesting/requestingSelector";
import UserActions from "@/redux/user/actions";
import Fields from "@/utilities/fields/field";

interface userDetailsProps {
    toggleField: Function;
    field: Record<string, boolean>;
    form: FormInstance
}


const UserDetails = ({ toggleField, field, form }: userDetailsProps) => {
    const dispatch = useDispatch();
    const selectedUser = useSelector(UserSelectors.selectSelectedUser)

    const firstNameUdating = useSelector((state) => requestingSelector(state, [UserActions.UPDATE_USER_FIRST_NAME]))
    const lastNameUdating = useSelector((state) => requestingSelector(state, [UserActions.UPDATE_USER_LAST_NAME]))
    const rolesUdating = useSelector((state) => requestingSelector(state, [UserActions.UPDATE_USER_ROLES]))

    const updateFirstName = () => {
        const firstName = form.getFieldValue([`${selectedUser?.userId}`, 'firstName'])
        dispatch(UserActions.updateUserFirstName({ id: selectedUser?.userId, data: { firstName } }))
    }

    const updateLastName = () => {
        const lastName = form.getFieldValue([`${selectedUser?.userId}`, 'lastName'])
        dispatch(UserActions.updateUserLastName({ id: selectedUser?.userId, data: { lastName } }))
    }

    const updateRoles = () => {
        const roles = form.getFieldValue([`${selectedUser?.userId}`, 'roles'])
        dispatch(UserActions.updateUserRoles({ id: selectedUser?.userId, data: { roles } }))
    }

    return (
        <Form form={form}>
            <div className="user-details-sidebar" style={{ width: '100%' }}>
                <Fields
                    info={[{
                        label: 'First Name',
                        value: <div style={{height:'40px'}}>
                            <CustomEdit
                                form={form}
                                name="firstName"
                                onSubmit={updateFirstName}
                                isActive={field.firstName}
                                loading={firstNameUdating}
                                value={selectedUser?.firstName}
                                setSubmitDisable={(value) => console.log(value)}
                                onCancel={() => toggleField('firstName', false)}
                                setActive={() => toggleField('firstName', true)}
                                userDefineField={{ fieldId: selectedUser.userId }}

                            >
                                {selectedUser?.firstName}
                            </CustomEdit>
                        </div>
                    },
                    {
                        label: 'Last Name',
                        value: <div style={{height:'40px'}}>
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
                            userDefineField={{ fieldId: selectedUser.userId }}

                        >
                            {selectedUser?.lastName}
                        </CustomEdit>
                        </div>
                    },
                    {
                        label: 'Contact Number',
                        value: <div style={{height:'40px'}}>
                            {selectedUser?.phone}
                            </div> 
                    },
                    {
                        label: 'Roles',
                        value: <div style={{height:'40px'}}>
                        <CustomEdit
                            form={form}
                            name="roles"
                            onSubmit={updateRoles}
                            isActive={field.roles}
                            loading={rolesUdating}
                            value={[{ label: selectedUser?.role, value: selectedUser?.role }]}
                            setSubmitDisable={(value) => console.log(value)}
                            onCancel={() => toggleField('roles', false)}
                            setActive={() => toggleField('roles', true)}
                            userDefineField={{ fieldId: selectedUser?.userId, options: roles }}
                            type="multiple"
                        >
                            {selectedUser?.role}
                        </CustomEdit>
                        </div>
                    }
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
}

export default UserDetails;