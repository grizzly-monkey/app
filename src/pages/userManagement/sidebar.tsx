import React, { useEffect } from "react";
import SideBar from "@/components/ui/sidebar";
import UserSelectors from "@/redux/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Dropdown, Flex, Popconfirm, Space, theme, Form as AntdForm } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import UserActions from "@/redux/user/actions";
import { BsThreeDots } from "react-icons/bs";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import Button from "@/components/common/button";
import "./style.scss";
import { getTranslation } from "@/translation/i18n";
import UserDetails from "./userDetails";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import FullAlertError from "@/components/common/error/FullAlertError";
import requestingSelector from "@/redux/requesting/requestingSelector";

const { useToken } = theme;
const selectError = makeSelectErrorModel()

const UserSidebar = () => {
    const initial = {
        firstName: false,
        lastName: false,
        roles: false,
    }
    const [field, setField] = useState(initial)
    const [prevDeleteUserLoading, setPrevDeleteUserLoading] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { token } = useToken();
    const [form] = AntdForm.useForm();
    const contentStyle: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };
    const selectedUser = useSelector(UserSelectors.selectSelectedUser)
    const updatedUser = useSelector(UserSelectors.selectUpdatedUser)
    const updateUserFirstNameError = useSelector(state => selectError(state, UserActions.UPDATE_USER_FIRST_NAME_FINISHED))
    const updateUserLastNameError = useSelector(state => selectError(state, UserActions.UPDATE_USER_LAST_NAME_FINISHED))
    const updateUserRolesError = useSelector(state => selectError(state, UserActions.UPDATE_USER_ROLES_FINISHED))
    const deleteUserError = useSelector(state=> selectError(state,UserActions.DELETE_USER))
    const deleteUserLoading = useSelector(state => requestingSelector(state, [UserActions.DELETE_USER]))
    const dispatch = useDispatch();
    const closeSidebar = () => {
        dispatch(UserActions.unSelectUser())
    }
    const toggleField = (key: string, value: boolean) => setField({ ...field, [key]: value })

    useEffect(() => {
        if (updatedUser?.lastName) toggleField('firstName', false)
        if (updatedUser?.lastName) toggleField('lastName', false)
        if (updatedUser?.roles) toggleField('role', false)
    }, [updatedUser])

    const deleteUser = () => {
        dispatch(UserActions.deleteUser(selectedUser?.userId))
    }

    useEffect(() => {
        if (prevDeleteUserLoading && !deleteUserLoading || deleteUserError) {
            setIsMenuOpen(false)
        }
        setPrevDeleteUserLoading(deleteUserLoading)
    }, [deleteUserLoading])

    return (
        <SideBar isOpen={!!selectedUser} >
            <div style={{ padding: '20px 20px', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
                    <h5 style={{ fontSize: '130%' }}>
                        <strong> User Details</strong>
                    </h5>
                    <Flex gap={20}>
                        <Dropdown
                            trigger={['click']}
                            open={isMenuOpen}
                            onOpenChange={setIsMenuOpen}
                            dropdownRender={() => (
                                <div style={contentStyle}>
                                    <Space style={{ padding: 8 }}>
                                        <Popconfirm title={getTranslation("global.areYouSure")}
                                            okText={getTranslation("global.yes")}
                                            cancelText={getTranslation("global.cancel")}
                                            onCancel={() => setIsMenuOpen(false)}
                                            onConfirm={deleteUser}
                                        >
                                            <Button icon={<DeleteOutlined />} type="primary"
                                                label={getTranslation("global.delete")}
                                                loading={deleteUserLoading}
                                                style={{ padding: "0px 15px" }} danger />

                                        </Popconfirm>
                                    </Space>
                                </div>
                            )}
                        >
                            <BsThreeDots style={{ cursor: 'pointer', padding: '5px 5px', fontSize: '30px' }} />
                        </Dropdown>
                        <CloseOutlined style={{ cursor: 'pointer', padding: '5px 5px' }} onClick={closeSidebar} />
                    </Flex>
                </div>
                <Divider />
                {!!updateUserFirstNameError && <FullAlertError error={updateUserFirstNameError} />}
                {!!updateUserLastNameError && <FullAlertError error={updateUserLastNameError} />}
                {!!updateUserRolesError && <FullAlertError error={updateUserRolesError} />}
                {!!deleteUserError && <FullAlertError error={deleteUserError} />}
                <UserDetails toggleField={toggleField} field={field} form={form} />
            </div>
        </SideBar>
    );
}

export default UserSidebar;
