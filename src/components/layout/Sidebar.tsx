import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";
import { FaWheatAwn } from "react-icons/fa6";
import { FaWater } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { FaTractor } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { Images } from "@/utilities/imagesPath";
import routePaths from "@/config/routePaths";

const { SubMenu } = Menu;

function Sidenav() {
  const location = useLocation();

  return (
    <div className="sideBar">
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
            location.pathname.includes(routePaths.farm)
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
              <div style={{ display: "flex", alignItems: "center" }}>
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
              location.pathname.includes(routePaths.polyhouse)
                ? "ant-menu-item-selected"
                : ""
            }
          >
            <NavLink to={routePaths.polyhouse}>
              <div style={{ display: "flex", alignItems: "center" }}>
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
              location.pathname.includes(routePaths.reservoirs)
                ? "ant-menu-item-selected"
                : ""
            }
          >
            <NavLink to={routePaths.reservoirs}>
              <div style={{ display: "flex", alignItems: "center" }}>
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
              location.pathname.includes(routePaths.inventory)
                ? "ant-menu-item-selected"
                : ""
            }
          >
            <NavLink to={routePaths.inventory}>
              <div style={{ display: "flex", alignItems: "center" }}>
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
              location.pathname.includes(routePaths.tasks)
                ? "ant-menu-item-selected"
                : ""
            }
          >
            <NavLink to={routePaths.tasks}>
              <div style={{ display: "flex", alignItems: "center" }}>
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
            location.pathname.includes(routePaths.workflow)
              ? "ant-menu-item-selected"
              : ""
          }
        >
          <NavLink to={routePaths.workflow}>
            <div style={{ display: "flex", alignItems: "center" }}>
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
            location.pathname.includes(routePaths.userManagement)
              ? "ant-menu-item-selected"
              : ""
          }
        >
          <NavLink to={routePaths.userManagement}>
            <div style={{ display: "flex", alignItems: "center" }}>
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
