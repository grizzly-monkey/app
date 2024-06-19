import React from "react";
import SideBar from "@/components/ui/sidebar";
import UserSelectors from "@/redux/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Dropdown, Flex, Popconfirm, Space, theme } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import UserActions from "@/redux/user/actions";
import { BsThreeDots } from "react-icons/bs";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import Button from "@/components/common/button";
import "./style.scss";
import { getTranslation } from "@/translation/i18n";

const { useToken } = theme;

const UserSidebar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { token } = useToken();

    const contentStyle: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };
    const selectedUser = useSelector(UserSelectors.selectSelectedUser)
    const dispatch = useDispatch();
    const closeSidebar = () => {
        dispatch(UserActions.unSelectUser())
    }

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
                                            
                                        >
                                            <Button icon={<DeleteOutlined />} type="primary" label={getTranslation("global.delete")}
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
                <div className="user-details-sidebar" style={{ width: '100%' }}>
                    <table>
                        <tbody>
                            <tr >
                                <td>
                                    <strong>
                                        First Name
                                    </strong>
                                </td>
                                <td>{selectedUser?.firstName}</td>
                            </tr>
                            <tr>
                                <td><strong>
                                    Last Name
                                </strong></td>
                                <td>{selectedUser?.lastName}</td>
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
                                <td>{selectedUser?.role}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </SideBar>
    );
}

export default UserSidebar;