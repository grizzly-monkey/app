import SideBar from "@/components/ui/sidebar";
import UserSelectors from "@/redux/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { Divider, Dropdown, Flex, MenuProps, Popconfirm } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import UserActions from "@/redux/user/actions";
import { BsThreeDots } from "react-icons/bs";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

const UserSidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const selectedUser = useSelector(UserSelectors.selectSelectedUser);
  const dispatch = useDispatch();
  const closeSidebar = () => {
    dispatch(UserActions.unSelectUser());
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      danger: true,
      label: (
        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onConfirm={() => {
            setIsMenuOpen(false);
          }}
        >
          Delete
        </Popconfirm>
      ),
      icon: (
        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onConfirm={() => {}}
        >
          <DeleteOutlined />
        </Popconfirm>
      ),
      onClick: () => {},
    },
  ];
  return (
    <SideBar isOpen={!!selectedUser}>
      <div style={{ padding: "20px 20px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
          }}
        >
          <h5 style={{ fontSize: "130%" }}>
            <strong> User Details</strong>
          </h5>
          <Flex gap={20}>
            <Dropdown menu={{ items }} trigger={["click"]} open={isMenuOpen}>
              <BsThreeDots
                style={{
                  cursor: "pointer",
                  padding: "5px 5px",
                  fontSize: "30px",
                }}
              />
            </Dropdown>
            <CloseOutlined
              style={{ cursor: "pointer", padding: "5px 5px" }}
              onClick={closeSidebar}
            />
          </Flex>
        </div>
        <Divider />
        <div className="user-details-sidebar" style={{ width: "100%" }}>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>First Name</strong>
                </td>
                <td>{selectedUser?.firstName}</td>
              </tr>
              <tr>
                <td>
                  <strong>Last Name</strong>
                </td>
                <td>{selectedUser?.lastName}</td>
              </tr>
              <tr>
                <td>
                  <strong>Contact Number</strong>
                </td>
                <td>{selectedUser?.phone}</td>
              </tr>
              <tr>
                <td>
                  <strong>Roles</strong>
                </td>
                <td>{selectedUser?.role}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </SideBar>
  );
};

export default UserSidebar;
