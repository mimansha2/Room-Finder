import React, { Suspense } from "react";
import AppHeader from "./AppHeader";
import AppBody from "./AppBody";
import { Layout } from "antd";

const AppLayout: React.FC = () => {
  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <AppHeader />
      <AppBody />
    </Layout>
  );
};

export default AppLayout;
