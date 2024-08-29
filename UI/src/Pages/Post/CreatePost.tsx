import CustomForm from "../../Components/CustomForm";
import CustomField from "../../Components/CustomField";
import { Button, Card, Input, InputNumber, notification, Result } from "antd";
import CreateButton from "../../Components/Buttons/CreateButton";
import TextArea from "antd/es/input/TextArea";
import ImageUploadField from "../../Components/ImageUploadField";
import { useForm } from "antd/es/form/Form";
import useApi from "../../hooks/useApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ReloadOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";

const formId = "createPost";
const controllerName = "Posts";

const CreatePost = () => {
  const [form] = useForm();
  const { user } = useAuth0();
  const api = useApi(controllerName);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userProfileApi = useApi("userProfile");

  const GetUserProfile = async () => {
    const response = await userProfileApi.get<any>("");
    return response.data;
  };

  const {
    data: userData,
    isPending,
    status,
  } = useQuery({
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

  const onFinish = async (values: any) => {
    await api.post("create", values);
    form.resetFields();
    notification.info({
      description: "Your post have been submitted for verification process",
      message: "Info",
      placement: "bottomLeft",
    });
    navigate("/");
  };

  const mutation = useMutation({
    mutationFn: onFinish,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getUnapprovedPosts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["unApprovedPosts"],
      });
    },
  });

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

  if (userData === null) {
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

  return (
    <Card
      title="Create Post"
      size="small"
      extra={<CreateButton formName={formId} />}
    >
      <CustomForm
        formLoading={isPending ?? mutation.isPending}
        name="createPost"
        id={formId}
        onFinish={mutation.mutate}
      >
        <CustomField
          label="Location"
          name="location"
          rules={[{ required: true }]}
          required
        >
          <Input autoFocus />
        </CustomField>
        <CustomField
          label="Bedroom"
          name="bedroom"
          rules={[{ required: true }]}
          required
        >
          <InputNumber style={{ width: "100%" }} />
        </CustomField>
        <CustomField
          label="Hall"
          name="hall"
          rules={[{ required: true }]}
          required
        >
          <InputNumber style={{ width: "100%" }} />
        </CustomField>
        <CustomField
          label="Kitchen"
          name="kitchen"
          rules={[{ required: true }]}
          required
        >
          <InputNumber style={{ width: "100%" }} />
        </CustomField>
        <CustomField
          label="Bike Parking"
          name="bikeParking"
          rules={[{ required: true }]}
          required
        >
          <InputNumber style={{ width: "100%" }} />
        </CustomField>
        <CustomField
          label="Car Parking"
          name="carParking"
          rules={[{ required: true }]}
          required
        >
          <InputNumber style={{ width: "100%" }} />
        </CustomField>

        <CustomField
          label="Price"
          name="price"
          rules={[{ required: true }]}
          required
        >
          <InputNumber prefix="रु" style={{ width: "100%" }} />
        </CustomField>

        <CustomField
          label="Description"
          name="description"
          rules={[{ required: true }]}
          required
          span={{
            xs: 24,
            sm: 24,
            md: 24,
            lg: 24,
            xl: 24,
            xxl: 24,
          }}
        >
          <TextArea
            showCount
            maxLength={500}
            // onChange={onChange}
            // placeholder="disable resize"
            // style={{ height: 120, resize: "none" }}
          />
        </CustomField>

        <ImageUploadField />
      </CustomForm>
    </Card>
  );
};

export default CreatePost;
