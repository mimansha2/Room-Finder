import {
  CheckCircleOutlined,
  DashboardOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Layout, Menu, Row, Space, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const Admin = () => {
  const { Content, Sider } = Layout;
  const navigate = useNavigate();

  const items: any[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
      onClick: () => {
        navigate("");
      },
    },
    {
      key: "unapprovedPosts",
      label: "Unapproved Posts",
      icon: <DashboardOutlined />,
      onClick: () => {
        navigate("UnapprovedPosts");
      },
    },
    {
      key: "approvedPosts",
      label: "Approved Posts",
      icon: <CheckCircleOutlined />,
      onClick: () => {
        navigate("ApprovedPosts");
      },
    },
    {
      key: "reportedPosts",
      label: "Reported Posts",
      icon: <WarningOutlined />,
      onClick: () => {
        navigate("ReportedPosts");
      },
    },
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Content>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            style={{ background: colorBgContainer }}
            width={200}
            breakpoint="md"
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["dashboard"]}
              style={{ height: "100%" }}
              items={items}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default Admin;
