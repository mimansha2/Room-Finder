import { Form, FormProps, Row, Spin } from "antd";
import { ReactNode } from "react";

interface CustomFormProps extends FormProps {
  children: ReactNode;
  formLoading: boolean;
}

const validateMessages = {
  // FOR dynamic validation message. Override this validation message with your own validation message if required with the rules prop in CustomField Component.
  required: "${label} is required!",
  whitespace: "${label} cannot be a blank character",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  string: {
    len: "${label} must be ${len} characters",
    min: "${label} must be at least ${min} characters",
    max: "${label} must be up to ${max} characters",
    range: "${label} must be between ${min}-${max} characters",
  },
  number: {
    len: "${label} must be equal to ${len}",
    min: "${label} must be minimum ${min}",
    max: "${label} must be maximum ${max}",
    range: "${label} must be between ${min}-${max}",
  },
};

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 24 },
// };

const CustomForm = (props: CustomFormProps) => {
  return (
    <Spin size="large" spinning={props.formLoading ?? false}>
      <Form
        style={{ padding: 10 }}
        //   {...layout}
        labelWrap
        layout="vertical"
        variant="outlined"
        size="middle"
        autoComplete="off"
        validateMessages={validateMessages}
        {...props}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>{props.children}</Row>
      </Form>
    </Spin>
  );
};

export default CustomForm;
