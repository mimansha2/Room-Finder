import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

const CreateButton = (props: { formName: string }) => {
  return (
    <Button
      size="small"
      type="primary"
      htmlType="submit"
      form={props.formName}
      icon={<PlusOutlined />}
    >
      Create
    </Button>
  );
};

export default CreateButton;
