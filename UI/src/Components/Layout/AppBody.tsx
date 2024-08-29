import { Layout, Spin } from "antd";
import AppFooter from "./AppFooter";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

const { Content } = Layout;

const AppBody = () => {
  return (
    <Layout style={{ paddingTop: 10 }}>
      <Content
        style={{
          overflow: "auto",
          padding: 16,
          margin: 0,
          minHeight: 280,
          // background: colorBgContainer,
          // borderRadius: borderRadiusLG,
        }}
      >
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
              }}
            >
              <Spin delay={2} size="large" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default AppBody;
