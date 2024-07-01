import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Button, Drawer } from "antd";
import Sidenav from "./Sidebar";
import Header from "./Header";
import { Images } from "@/utilities/imagesPath";

const { Content, Sider } = Layout;

function Main() {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleSidebar = () => {
    setVisible(!visible);
  };

  return (
    <Layout>
      <Drawer
        title={false}
        placement="left"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={"left"}
        width={280}
        className={`drawer-sidebar`}
      >
        <Sider
          trigger={null}
          width={250}
          theme="light"
          className={`sider-primary ant-layout-sider-primary`}
        >
          <Sidenav />
        </Sider>
      </Drawer>
      <Sider
        width={250}
        theme="light"
        className="responsiveSider"
        style={{ paddingRight: "10px" }}
      >
        <Sidenav />
      </Sider>
      <Layout>
        <div>
          <Header toggleSidebar={toggleSidebar} />
        </div>
        <Content className="content-ant">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
