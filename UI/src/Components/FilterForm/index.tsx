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
  onLocationChange: (locationName: string) => void;
  onBedroomCountChange: (bedroomCount: string) => void;
  onHallCountChange: (hallCount: number) => void;
  onKitchenCountChange: (kitchenCount: number) => void;
  onDateRangeChange: (dateArr: []) => void;
  onPriceRangeChange: (priceArr: []) => void;
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
        <Input
          autoFocus
          onChange={(e) => {
            props.onLocationChange(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item name="bedroom" label="Bedroom">
        <Input
          type="number"
          onChange={(e) => {
            props.onBedroomCountChange(e.target.value);
          }}
        />
      </Form.Item>
      <Form.Item name="hall" label="Hall">
        <Input />
      </Form.Item>
      <Form.Item name="kitchen" label="Kitchen">
        <Input />
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
          min={0}
          max={1000}
          step={10}
          tooltip={{ formatter: (value) => `$${value}` }}
          onChange={(val) => {
            console.log("val", val);
          }}
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
