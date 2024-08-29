import { Layout, Menu, MenuProps, theme } from "antd";

const { Sider } = Layout;
const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const AppSidebar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider
      collapsible
      //   zeroWidthTriggerStyle={{
      //     borderRadius: "50%",
      //   }}
      collapsedWidth={0}
      breakpoint="md"
      width={200}
      style={{ background: colorBgContainer }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
        items={items1}
      />
    </Sider>
  );
};

export default AppSidebar;
