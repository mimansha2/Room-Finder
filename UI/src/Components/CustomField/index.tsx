import { Col, Form, FormItemProps } from "antd";

interface CustomFieldProps extends FormItemProps {
  span?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}

const CustomField = (props: CustomFieldProps) => {
  return (
    <Col
      xs={props.span?.xs ?? 24}
      sm={props.span?.sm ?? 24}
      md={props.span?.md ?? 12}
      lg={props.span?.lg ?? 8}
      xl={props.span?.xl ?? 6}
      xxl={props.span?.xxl ?? 6}
    >
      <Form.Item
        hasFeedback
        validateTrigger={["onBlur", "onInput", "onChange"]}
        {...props}
      >
        {props.children}
      </Form.Item>
    </Col>
  );
};

export default CustomField;
