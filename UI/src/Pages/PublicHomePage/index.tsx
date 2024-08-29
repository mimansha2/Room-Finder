import { Layout, Menu, theme, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import AppFooter from "../../Components/Layout/AppFooter";
import {
  ContactsOutlined,
  LoginOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import HomepagePosts from "./HomepagePosts";

const PublicHomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { loginWithRedirect } = useAuth0();

  const MenuItems = [
    {
      key: 1,
      label: "FAQ's",
      icon: <QuestionCircleOutlined />,
    },
    {
      key: 2,
      label: "Contact",
      icon: <ContactsOutlined />,
    },
    {
      key: 3,
      label: "Login",
      icon: <LoginOutlined />,
      onClick: () => {
        loginWithRedirect({
          appState: {
            returnTo: "/",
          },
        });
      },
    },
  ];

  const isDateOlderThanADay = (uploadedDate: string) => {
    var currentDate = new Date();

    var dayAgoDate = new Date();
    dayAgoDate.setDate(currentDate.getDate() - 1);

    var inputDate = new Date(uploadedDate);

    return inputDate < dayAgoDate;
  };

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Header
        style={{
          height: "45px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Text style={{ color: "white" }}>
          Room Finder
        </Typography.Text>

        <Menu
          theme="dark"
          mode="horizontal"
          //   defaultSelectedKeys={["1"]}
          items={MenuItems}
          style={{
            display: "flex",
            alignItems: "center",
            lineHeight: "45px",
          }}
        />
      </Header>

      <Content style={{ padding: "15px 40px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <HomepagePosts />
        </div>
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default PublicHomePage;
