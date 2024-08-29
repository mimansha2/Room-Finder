import { ReloadOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Result, Spin } from "antd";
import useApi from "../../hooks/useApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import MyProfileDetails from "./MyProfileDetails";
import { useNavigate } from "react-router-dom";

const controllerName = "userProfile";

const Profile = () => {
  const api = useApi(controllerName);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuth();

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

  if (isLoading) return <Spin fullscreen size="large" />;

  if (status === "error")
    return (
      <Result
        status="error"
        title="Failed to get details"
        subTitle="Please check the network connection and try again"
        extra={[
          <Button
            type="primary"
            key="console"
            icon={<ReloadOutlined />}
            iconPosition="start"
            onClick={() => {
              queryClient.invalidateQueries({ queryKey: ["profile"] });
            }}
          >
            Reload
          </Button>,
        ]}
      />
    );

  if (data === null) {
    //Checking strictly if use does not exist. If user does not exist API sends data as null.
    return (
      <Result
        status={"info"}
        title="You have not created user profile"
        subTitle="First create user profile to access this feature"
        extra={[
          <Button
            type="primary"
            icon={<UserOutlined />}
            onClick={() => {
              navigate("/CreateProfile");
            }}
          >
            Create Profile
          </Button>,
        ]}
      />
    );
  }

  if (data) return <MyProfileDetails data={data} isLoading={isLoading} />;
};

export default Profile;
