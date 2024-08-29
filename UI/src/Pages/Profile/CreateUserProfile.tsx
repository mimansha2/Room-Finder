import {
  Card,
  Col,
  Image,
  Input,
  Row,
  Select,
  Space,
  Upload,
  UploadFile,
} from "antd";
import CreateButton from "../../Components/Buttons/CreateButton";
import CustomForm from "../../Components/CustomForm";
import { useForm } from "antd/es/form/Form";
import useApi from "../../hooks/useApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import CustomField from "../../Components/CustomField";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Option } from "antd/es/mentions";
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL } from "../../hooks/useApi";
import axios from "axios";
import type { GetProp, UploadProps } from "antd";
import { useAuth0 } from "@auth0/auth0-react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const formId = "createProfile";
const controllerName = "userProfile";

export const selectNationality = [
  {
    label: "Brazil",
    value: "Brazil",
    emoji: "🇧🇷",
    desc: "Brazil (Brasil)",
  },
  {
    label: "Canada",
    value: "Canada",
    emoji: "🇨🇦",
    desc: "Canada (Canada)",
  },
  {
    label: "China",
    value: "China",
    emoji: "🇨🇳",
    desc: "China (中国)",
  },
  {
    label: "France",
    value: "France",
    emoji: "🇫🇷",
    desc: "France (France)",
  },
  {
    label: "Germany",
    value: "Germany",
    emoji: "🇩🇪",
    desc: "Germany (Deutschland)",
  },
  {
    label: "India",
    value: "India",
    emoji: "🇮🇳",
    desc: "India (भारत)",
  },
  {
    label: "Italy",
    value: "Italy",
    emoji: "🇮🇹",
    desc: "Italy (Italia)",
  },
  {
    label: "Japan",
    value: "Japan",
    emoji: "🇯🇵",
    desc: "Japan (日本)",
  },
  {
    label: "Korea",
    value: "Korea",
    emoji: "🇰🇷",
    desc: "Korea (韩国)",
  },
  {
    label: "Nepal",
    value: "Nepal",
    emoji: "🇳🇵",
    desc: "Nepal (नेपाल)",
  },
  {
    label: "USA",
    value: "USA",
    emoji: "🇺🇸",
    desc: "USA (美国)",
  },
];

const CreateUserProfile = () => {
  const [form] = useForm();
  const api = useApi(controllerName);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuth0();

  const onFinish = async (values: any) => {
    await api.post("", {
      ...values,
    });
  };

  const mutation = useMutation({
    mutationFn: onFinish,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myProfile"],
      });
      form.resetFields();
      navigate("/profile");
    },
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<string>();

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    form.setFieldValue("userName", user?.nickname);
    form.setFieldValue("email", user?.email);
  }, []);

  return (
    <Card
      title="Create Profile"
      size="small"
      extra={<CreateButton formName={formId} />}
    >
      <CustomForm
        form={form}
        formLoading={mutation.isPending}
        name="createPost"
        id={formId}
        onFinish={mutation.mutate}
      >
        <Col lg={20}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <CustomField
              label="Username"
              name="userName"
              rules={[{ required: true, min: 3, max: 99 }]}
              required
            >
              <Input autoFocus disabled defaultValue={user?.nickname} />
            </CustomField>

            <CustomField
              label="Email"
              name="email"
              rules={[{ required: true, min: 3, max: 99 }]}
              required
            >
              <Input autoFocus disabled defaultValue={user?.email} />
            </CustomField>

            <CustomField
              label="First Name"
              name="firstName"
              rules={[{ required: true, min: 3, max: 99 }]}
              required
            >
              <Input autoFocus />
            </CustomField>

            <CustomField
              label="Last Name"
              name="lastName"
              rules={[{ required: true, min: 3, max: 99 }]}
              required
            >
              <Input />
            </CustomField>

            <CustomField
              label="Gender"
              name="gender"
              rules={[{ required: true }]}
              required
              span={{
                xs: 24,
                sm: 24,
                md: 12,
                lg: 4,
                xl: 4,
                xxl: 4,
              }}
            >
              <Select placeholder="Gender">
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </CustomField>

            <CustomField
              label="Nationality"
              name="nationality"
              rules={[{ required: true }]}
              required
              span={{
                xs: 24,
                sm: 24,
                md: 12,
                lg: 4,
                xl: 4,
                xxl: 4,
              }}
            >
              <Select
                placeholder="Nationality"
                options={selectNationality}
                optionRender={(option) => (
                  <Space>
                    <span role="img" aria-label={option.data.label}>
                      {option.data.emoji}
                    </span>
                    {option.data.desc}
                  </Space>
                )}
              />
            </CustomField>

            <CustomField
              label="Mobile Number"
              name="mobileNo"
              rules={[{ required: true, min: 3, max: 99 }]}
              required
              span={{
                xs: 24,
                sm: 24,
                md: 12,
                lg: 4,
                xl: 4,
                xxl: 4,
              }}
            >
              <Input />
            </CustomField>

            <CustomField
              label="Bio"
              name="bio"
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
              <TextArea showCount maxLength={500} />
            </CustomField>
          </Row>
        </Col>
        <Col lg={4} style={{ display: "flex", justifyContent: "space-around" }}>
          <>
            <CustomField
              label="Upload"
              name="profilePic"
              span={{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }}
            >
              <Upload
                customRequest={(options) => {
                  const formData = new FormData();
                  formData.append("file", options.file);
                  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

                  axios
                    .post(CLOUDINARY_URL, formData)
                    .then((res) => {
                      setFileList(res.data.secure_url);
                      console.log("res.data", res.data);

                      setTimeout(() => {
                        form.setFieldValue("profilePic", res.data.secure_url);
                      }, 1000);

                      options.onSuccess?.(res.data, res.data.secure_url);
                    })
                    .catch((err) => console.error(err));
                }}
                listType="picture-card"
                maxCount={1}
                multiple={false}
                onRemove={() => {
                  // DELETE api to be called.
                  setFileList(undefined);
                  setTimeout(() => {
                    form.setFieldValue("profilePic", "");
                  }, 1000);
                }}
                // name="profilePic"
                onPreview={handlePreview}
                // onChange={handleChange}
              >
                {!fileList && uploadButton}
              </Upload>
            </CustomField>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </>
        </Col>
      </CustomForm>
    </Card>
  );
};

export default CreateUserProfile;
