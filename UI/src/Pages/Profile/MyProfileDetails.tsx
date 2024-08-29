import { EditFilled, SmileOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Image,
  Row,
  Space,
  Timeline,
} from "antd";
import MyPostDetails from "./MyPostDetails";
import { useState } from "react";
import EditUserProfile from "./EditUserProfile";
import MyUnapprovedPosts from "./MyUnapprovedPosts";

interface MyProfileDetailsProps {
  data: any;
  isLoading: boolean;
}

const MyProfileDetails = (props: MyProfileDetailsProps) => {
  const [editProfile, setEditProfile] = useState<boolean>(false);

  return (
    <>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <Card
          size="small"
          title="General Information"
          loading={props.isLoading}
          extra={[
            <Button
              size="small"
              type="primary"
              icon={<EditFilled />}
              onClick={() => setEditProfile(true)}
            >
              Edit
            </Button>,
          ]}
        >
          <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 24 }}>
            <Col xs={24} md={24} lg={18}>
              <Descriptions size="small" bordered column={1}>
                <Descriptions.Item label="First Name" span={1.5}>
                  {props.data.firstName}
                </Descriptions.Item>
                <Descriptions.Item label="Last Name" span={1.5}>
                  {props.data.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Mobile Number">
                  {props.data.mobileNo}
                </Descriptions.Item>
                <Descriptions.Item label="Gender">
                  {props.data.gender}
                </Descriptions.Item>
                <Descriptions.Item label="Nationality">
                  {props.data.nationality}
                </Descriptions.Item>
                <Descriptions.Item label="Bio" span={4}>
                  {props.data.bio}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col
              xs={24}
              md={24}
              lg={6}
              style={{ display: "flex", justifyContent: "center", padding: 0 }}
            >
              <Image
                height={"100%"}
                width={"100%"}
                src={props.data.profilePic}
                style={{ padding: 10, borderRadius: 20 }}
              />
            </Col>
          </Row>
        </Card>

        <Row gutter={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
          <Col xs={24} md={24} lg={12}>
            <MyPostDetails />
          </Col>
          <Col xs={24} md={24} lg={12}>
            <MyUnapprovedPosts />
          </Col>
        </Row>
      </Space>

      <EditUserProfile
        open={editProfile}
        onClose={setEditProfile}
        formValues={props.data}
      />
    </>
  );
};

export default MyProfileDetails;
