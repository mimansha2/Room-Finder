import { Card, Col, Descriptions, Image, QRCode, Row, Statistic } from "antd";
import useApi from "../../hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import {
  CommentOutlined,
  LikeOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const controllerName = "Posts";

const PostDetails = (props: { id?: string }) => {
  const api = useApi(controllerName);
  const location = useLocation();
  const path =
    props.id ??
    location.pathname.slice(location.pathname.lastIndexOf("/")).split("/")[1];

  const GetPostById = async () => {
    const response = await api.getById<any>("", path);
    return response;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", path],
    queryFn: async () => {
      const response = await GetPostById();
      const data = response.data;
      return data;
    },
    meta: {
      showMessage: false,
    },
  });

  if (isLoading) return <h1>Loading....</h1>;
  if (isError) return <h1>Error loading data!!!</h1>;

  return (
    <Card title="Details" size="small">
      <Row gutter={[12, 12]}>
        <Col xs={24} lg={12}>
          <Descriptions
            bordered
            items={[
              // { key: "userName", label: "Owner", children: data.userName },
              { key: "location", label: "Location", children: data.location },
              { key: "bedroom", label: "Bedroom", children: data.bedroom },
              { key: "hall", label: "Hall", children: data.hall },
              { key: "kitchen", label: "Kitchen", children: data.kitchen },
              {
                key: "bikeParking",
                label: "Bike Parking",
                children: data.bikeParking,
              },
              {
                key: "carParking",
                label: "Car Parking",
                children: data.carParking,
              },
              {
                key: "createdAt",
                label: "Created At",
                children: new Date(data.createdAt).toDateString(),
              },
              {
                key: "updatedAt",
                label: "Updated At",
                children: new Date(data.updatedAt).toDateString(),
              },
              {
                key: "price",
                label: "Price",
                children: `Rs. ${data.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
              },
              {
                key: "description",
                label: "Description",
                children: data.description,
              },
            ]}
            layout="vertical"
            labelStyle={{ fontWeight: "bold" }}
            size="small"
          />
        </Col>

        <Col xs={24} lg={12}>
          <Card>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Card size="small">
                  <Statistic
                    title="Feedback"
                    value={data.likes.length}
                    valueStyle={{ color: "#3f8600" }}
                    prefix={<LikeOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card size="small">
                  <Statistic
                    title="Reports"
                    value={data.reports.length}
                    valueStyle={{ color: "red" }}
                    prefix={<WarningOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card size="small">
                  <Statistic
                    title="Comments"
                    value={93}
                    valueStyle={{ color: "purple" }}
                    prefix={<CommentOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <QRCode value={window.location.href} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <br />

      {data.image.length > 0 && (
        <Row gutter={[12, 12]} style={{ margin: 0 }}>
          <Card title="Image gallery" size="small" style={{ width: "100%" }}>
            <Image.PreviewGroup
              preview={{
                onChange: (current, prev) =>
                  console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              <>
                {data.image.map((x: any) => {
                  return <Image style={{ padding: 3 }} width={200} src={x} />;
                })}
              </>
            </Image.PreviewGroup>
          </Card>
        </Row>
      )}
    </Card>
  );
};

export default PostDetails;
