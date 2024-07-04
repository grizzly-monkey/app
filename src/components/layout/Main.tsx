import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidenav from "./Sidebar";

const { Content, Sider } = Layout;

function Main() {
  return (
    <Layout>
      <Sider width={300} theme="light">
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
