import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: "center", padding: 5 }}>
      Room Finder App ©{new Date().getFullYear()}
    </Footer>
  );
};

export default AppFooter;
