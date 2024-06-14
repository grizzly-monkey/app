import React from "react";
import { useLocation } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { DownOutlined } from "@ant-design/icons";
import { Space, Tag, Menu, List } from "antd";
import { FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import Dropdown from "../ui/dropdown";
import { RiLogoutBoxRLine } from "react-icons/ri";
import routePaths from "@/config/routePaths";

const Header = () => {
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case routePaths.farm:
        return "Farm";
        break;
      case routePaths.polyhouse:
        return "Polyhouses";
        break;
      case routePaths.reservoirs:
        return "Reservoirs";
        break;
      case routePaths.inventory:
        return "Inventory";
        break;
      case routePaths.tasks:
        return "Tasks";
        break;
      case routePaths.workflow:
        return "Workflow";
        break;
      default:
        return "Dashboard";
    }
  };
  const menu = (
    <Menu onClick={(e) => console.log(e)}>
      <Menu.Item key="profile">
        <span
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <FaUser />
          <p>Profile</p>
        </span>
      </Menu.Item>
      <Menu.Item key="logout">
        <span
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <RiLogoutBoxRLine />
          <p>Logout</p>
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="topBar">
      <div
        style={{
          display: "flex",
          padding: "20px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3>{getTitle()}</h3>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "5px" }}>Dummy farm</span>
            <span style={{ fontSize: "10px" }}>
              <DownOutlined />
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "5px" }}>English</span>
            <span style={{ fontSize: "10px" }}>
              <DownOutlined />
            </span>
          </div>

          <div style={{ fontSize: "25px", display: "flex", color: "#3E3E3E" }}>
            <IoIosNotifications />
          </div>

          <span style={{ display: "flex", alignItems: "center" }}>
            <span className="topBarProfile">
              <FaUser />
            </span>
            <span>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>Jon Doe</p>
              <p style={{ fontSize: "12px", color: "gray" }}>OWNER</p>
            </span>
          </span>

          <span style={{ fontSize: "10px" }}>
            <Dropdown children={<DownOutlined />} overlay={menu}  />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
