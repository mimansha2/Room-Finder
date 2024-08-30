import React from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Slider,
  Row,
  Col,
} from "antd";
import { useForm, useWatch } from "antd/es/form/Form";

const { RangePicker } = DatePicker;
const { Option } = Select;

const FilterForm = (props: {
  onFormValueChange: (formValues: any) => void;
}) => {
  const [form] = useForm();
  const formWatch = useWatch("", form);

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={(_, allVal) => {
        props.onFormValueChange(allVal);
        // console.log("val", val);
        // console.log("allVal", allVal);
      }}
    >
      {/* Location Field */}
      <Form.Item name="location" label="Location">
        <Input autoFocus />
      </Form.Item>
      <Form.Item name="bedroom" label="Bedroom">
        <Input min={0} type="number" />
      </Form.Item>
      <Form.Item name="hall" label="Hall">
        <Input min={0} type="number" />
      </Form.Item>
      <Form.Item name="kitchen" label="Kitchen">
        <Input min={0} type="number" />
      </Form.Item>
      <Form.Item name="dateRange" label="Date Range">
        <RangePicker
          onChange={(dates, dateArr) => {
            console.log("dates", dates);
            console.log("datesArr", dateArr);
          }}
        />
      </Form.Item>

      {/* Price Range Field */}
      <Form.Item name="priceRange" label="Price Range">
        <Slider
          range
          min={1000}
          max={100000}
          step={1000}
          defaultValue={[1000, 100000]}
          tooltip={{ formatter: (value) => `Rs. ${value}` }}
        />
      </Form.Item>

      {/* Date Range Field */}

      {/* Submit Button */}
      {/* <Form.Item>
        <Button type="primary" htmlType="submit">
          Filter
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default FilterForm;
