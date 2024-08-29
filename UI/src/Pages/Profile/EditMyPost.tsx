import { Card, Input, InputNumber } from "antd";
import CreateButton from "../../Components/Buttons/CreateButton";
import CustomForm from "../../Components/CustomForm";
import CustomField from "../../Components/CustomField";
import TextArea from "antd/es/input/TextArea";
import ImageUploadField from "../../Components/ImageUploadField";
import { useForm } from "antd/es/form/Form";
import { useAuth } from "../../context/AuthContext";
import useApi from "../../hooks/useApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";

const formId = "editPost";
const controllerName = "Posts";

interface EditMyPostProps {
  formValues: any;
  onClose: (value: false) => void;
}

const EditMyPost = (props: EditMyPostProps) => {
  const [form] = useForm();
  const { user } = useAuth0();
  const api = useApi(controllerName);
  const queryClient = useQueryClient();

  const onFinish = async (values: any) => {
    await api.put("editPost", {
      ...values,
      id: props.formValues._id,
      userName: user?.nickname,
    });
    form.resetFields();
  };

  const mutation = useMutation({
    mutationFn: onFinish,
    onSuccess: () => {
      props.onClose(false);
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
  });

  return (
    <CustomForm
      formLoading={mutation.isPending}
      name={formId}
      id={formId}
      onFinish={mutation.mutate}
      initialValues={props.formValues}
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

      <ImageUploadField defaultImages={props.formValues.image} />
    </CustomForm>
  );
};

export default EditMyPost;
