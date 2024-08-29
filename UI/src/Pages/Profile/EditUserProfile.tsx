import {
  Button,
  Col,
  Drawer,
  Form,
  Image,
  Input,
  Row,
  Select,
  Space,
  Upload,
  UploadFile,
} from "antd";
import CustomForm from "../../Components/CustomForm";
import { useForm } from "antd/es/form/Form";
import useApi, {
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_URL,
} from "../../hooks/useApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import CustomField from "../../Components/CustomField";
import { Option } from "antd/es/mentions";
import TextArea from "antd/es/input/TextArea";
import { selectNationality } from "./CreateUserProfile";
import axios from "axios";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadProps } from "antd";
import { useAuth0 } from "@auth0/auth0-react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface EditUserProfileProps {
  open: boolean;
  onClose: (value: false) => void;
  formValues: any;
}

const formId = "editUserProfile";
const controllerName = "userProfile";

const EditUserProfile = (props: EditUserProfileProps) => {
  const [form] = useForm();

  const api = useApi(controllerName);
  const queryClient = useQueryClient();
  const { user } = useAuth0();

  const onFinish = async (values: any) => {
    await api.put("editUserProfile", {
      ...values,
      userName: user?.nickname,
      id: props.formValues._id,
    });
    form.resetFields();
  };

  const mutation = useMutation({
    mutationFn: onFinish,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myProfile"],
      });
      props.onClose(false);
    },
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<string | undefined>(
    props.formValues.profilePic
  );

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

  console.log(!fileList || !props.formValues.profilePic);

  return (
    <Drawer
      destroyOnClose
      title="Edit Profile"
      width={720}
      onClose={() => props.onClose(false)}
      open={props.open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={() => props.onClose(false)}>Cancel</Button>
          <Button type="primary" htmlType="submit" form={formId}>
            Submit
          </Button>
        </Space>
      }
    >
      <CustomForm
        initialValues={props.formValues}
        formLoading={mutation.isPending}
        name="createPost"
        id={formId}
        onFinish={mutation.mutate}
        form={form}
      >
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

        <Col
          sm={24}
          style={{ display: "flex", justifyContent: "space-around" }}
        >
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
                defaultFileList={[
                  {
                    url: props.formValues.profilePic,
                    uid: `-${0}`, // Ensure each file has a unique `uid`
                    name: `image-${0}.png`, // Generate a unique name for each image
                    status: "done", // Assuming these images are already uploaded
                  },
                ]}
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
    </Drawer>
  );
};

export default EditUserProfile;
