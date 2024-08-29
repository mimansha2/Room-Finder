import {
  BellFilled,
  BellOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleFilled,
  FileAddFilled,
  HomeFilled,
  NotificationFilled,
  UserOutlined,
} from "@ant-design/icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Tooltip,
  Typography,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useApi from "../../hooks/useApi";
import { useAuth0 } from "@auth0/auth0-react";

const { Header } = Layout;

const AppHeader = () => {
  const queryClient = useQueryClient();
  const { user: defaultUser, logout } = useAuth0();
  const { user: userRoles } = useAuth();

  const handleLogout = () => {
    queryClient.clear();
    localStorage.clear();
    logout({
      logoutParams: {
        returnTo: `${window.location.origin}/public`,
      },
    });
  };

  const MenuItems = [
    {
      key: "1",
      label: <Link to={"/"}>Home</Link>,
      icon: <HomeFilled />,
    },
    {
      key: "2",
      label: <Link to={"CreatePost"}>Create Post</Link>,
      icon: <FileAddFilled />,
    },
    // {
    //   key: "3",
    //   label: "Notifications",
    //   icon: <NotificationFilled />,
    // },
  ];

  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
      onClick: () => {
        navigate("/Profile");
      },
    },
    {
      key: "2",
      label: "Admin",
      onClick: () => {
        navigate("/Admin");
      },
      style: {
        display: userRoles?.permissions?.includes?.("admin") ? "block" : "none",
      },
    },
    {
      key: "3",
      danger: true,
      label: "Logout",
      onClick: () => {
        queryClient.clear();
        handleLogout();
        // setTimeout(() => {
        //   logout();
        // }, 1000);
      },
    },
  ];

  const api = useApi("userProfile");
  const GetUserProfile = async () => {
    const response = await api.get<any>("");
    return response.data;
  };

  const { data, isLoading, status } = useQuery({
    queryKey: ["myProfile"],
    queryFn: async () => {
      const response = await GetUserProfile();
      const data = response.data;
      return data;
    },
    meta: {
      showMessage: false,
    },
  });

  const postStatusApi = useApi("notification");
  const GetPostStatus = async () => {
    const response = await postStatusApi.get<any>("myPostStatus");
    return response.data;
  };

  const { data: notificationData } = useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const response = await GetPostStatus();
      const data = response.data;
      return data;
    },
    meta: {
      showMessage: false,
    },
  });

  const notificationItems = notificationData?.map((notification: any) => ({
    key: notification._id,
    label: (
      <div>
        {notification.isActive && notification.isDeleted === false ? (
          <>
            <Typography.Text type="success" strong>
              <CheckCircleFilled /> Approved&nbsp;
            </Typography.Text>
            <p>{`Your post of ${notification.location}, ${
              notification.bedroom
            }B${notification.hall > 0 ? "H" : ""}${
              notification.kitchen > 0 ? "K" : ""
            } has been approved.`}</p>
          </>
        ) : (
          <>
            <Typography.Text type="danger" strong>
              <CloseCircleFilled /> Rejected&nbsp;
            </Typography.Text>
            <p>{`Your post of ${notification.location}, ${
              notification.bedroom
            }B${notification.hall > 0 ? "H" : ""}${
              notification.kitchen > 0 ? "K" : ""
            } has been rejected.`}</p>
          </>
        )}
      </div>
    ),
  }));

  return (
    <Header
      style={{
        height: "45px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography.Text style={{ color: "white" }}>Room Finder</Typography.Text>

      <div style={{ display: "flex", alignItems: "center" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={MenuItems}
          style={{
            display: "flex",
            alignItems: "center",
            lineHeight: "45px",
          }}
        />
        <Dropdown
          menu={{ items: notificationItems }}
          trigger={["click"]}
          placement="bottom"
          arrow
          destroyPopupOnHide
        >
          <Badge
            offset={[-7, -0]}
            count={notificationItems?.length ?? 0}
            overflowCount={9}
            size="small"
            color="rgb(45, 183, 245)"
            status="processing"
          >
            <Button
              style={{ marginRight: 10 }}
              size="small"
              type="dashed"
              shape="circle"
              icon={<BellFilled />}
            />
          </Badge>
        </Dropdown>
        <Typography.Text style={{ fontWeight: "bold", color: "white" }}>
          Hello, {defaultUser?.name}
        </Typography.Text>
        &nbsp; &nbsp;
        <Dropdown menu={{ items }} trigger={["click"]} placement="bottom">
          <div onClick={(e) => e.preventDefault()}>
            <Avatar
              size="default"
              shape="square"
              src={data?.profilePic ?? <UserOutlined />}
            />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
