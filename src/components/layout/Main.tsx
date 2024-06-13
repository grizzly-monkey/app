import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Button } from "antd";
import Sidenav from "./Sidebar";
import Header from "./Header";
import { Images } from "@/utilities/imagesPath";

const { Content, Sider } = Layout;

function Main() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider
        width={300}
        theme="light"
      >
        <Sidenav />
      </Sider>
      <Layout>
        <div>
          <Header />
        </div>
        <Content className="content-ant">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
