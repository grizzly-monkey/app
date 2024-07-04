import routePaths from "@/config/routePaths";
import { Images } from "@/utilities/imagesPath";
import { Menu } from "antd";
import { BsGraphUp } from "react-icons/bs";
import { FaTractor, FaWarehouse, FaWater } from "react-icons/fa";
import {
  FaBarsProgress,
  FaListCheck,
  FaUsers,
  FaWheatAwn,
} from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";

const { SubMenu } = Menu;

function Sidenav() {
  const location = useLocation();

  return (
    <div
      style={{
        height: "100vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FAFAFA",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        className="brand"
      >
        <img src={Images.LOGO} alt="Growloc" />
      </div>
      <div style={{ marginBottom: "10px" }} />
      <Menu mode="inline" defaultOpenKeys={["farm"]}>
        <SubMenu
          key="farm"
          className={
            location.pathname === routePaths.farm
              ? "selectedFarmTitle farmTitle"
              : "farmTitle"
          }
          title={
            <Menu.Item key="farm">
              <NavLink to={routePaths.farm}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="icon">
                    <FaTractor />
                  </span>
                  <span className="label">Farms</span>
                </div>
              </NavLink>
            </Menu.Item>
          }
        >
          <Menu.Item key="/dashboard">
            <NavLink to="/">
              <div
                className={"menuTitle"}
                style={{ display: "flex", alignItems: "center" }}
              >
                <span className="icon">
                  <BsGraphUp />
                </span>
                <span className="label">Dashboard</span>
              </div>
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key="polyhouses"
            className={
              routePaths.polyhouse === location.pathname
                ? "ant-menu-item-selected"
                : ""
            }
          >
            <NavLink to={routePaths.polyhouse}>
              <div
                className={"menuTitle"}
                style={{ display: "flex", alignItems: "center" }}
              >
                <span className="icon">
                  <FaWheatAwn />
                </span>
                <span className="label">Polyhouses</span>
              </div>
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key="reservoirs"
            className={
              routePaths.reservoirs === location.pathname
                ? "ant-menu-item-selected"
                : ""
            }
          >
            <NavLink to={routePaths.reservoirs}>
              <div
                className={"menuTitle"}
                style={{ display: "flex", alignItems: "center" }}
              >
                <span className="icon">
                  <FaWater />
                </span>
                <span className="label">Reservoirs</span>
              </div>
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key="inventory"
            className={
              routePaths.inventory === location.pathname
                ? "ant-menu-item-selected"
                : ""
            }
          >
            <NavLink to={routePaths.inventory}>
              <div
                className={"menuTitle"}
                style={{ display: "flex", alignItems: "center" }}
              >
                <span className="icon">
                  <FaWarehouse />
                </span>
                <span className="label">Inventory</span>
              </div>
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key="tasks"
            className={
              routePaths.tasks === location.pathname
                ? "ant-menu-item-selected"
                : ""
            }
          >
            <NavLink to={routePaths.tasks}>
              <div
                className={"menuTitle"}
                style={{ display: "flex", alignItems: "center" }}
              >
                <span className="icon">
                  <FaListCheck />
                </span>
                <span className="label">Tasks</span>
              </div>
            </NavLink>
          </Menu.Item>
        </SubMenu>

        <Menu.Item
          key="/workflow"
          className={
            routePaths.workflow === location.pathname
              ? "ant-menu-item-selected"
              : ""
          }
        >
          <NavLink to={routePaths.workflow}>
            <div
              className={"menuTitle"}
              style={{ display: "flex", alignItems: "center" }}
            >
              <span className="icon">
                <FaBarsProgress />
              </span>
              <span className="label">Workflow</span>
            </div>
          </NavLink>
        </Menu.Item>
        <Menu.Item
          key="/users"
          className={
            routePaths.userManagement === location.pathname
              ? "ant-menu-item-selected"
              : ""
          }
        >
          <NavLink to={routePaths.userManagement}>
            <div
              className={"menuTitle"}
              style={{ display: "flex", alignItems: "center" }}
            >
              <span className="icon">
                <FaUsers />
              </span>
              <span className="label">Users</span>
            </div>
          </NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Sidenav;
