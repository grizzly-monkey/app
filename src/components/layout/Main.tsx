import { Drawer, Layout } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidenav from "./Sidebar";

const { Content, Sider } = Layout;

function Main() {
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
        <Header toggleSidebar={toggleSidebar} />
        <Content className="content-ant">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
