import { Avatar, Card, Col, Descriptions, Image, List, Row } from "antd";
import useApi from "../../hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const controllerName = "Posts";
const HomepagePostDetails = (props: { id: string }) => {
  // const api = useApi(controllerName);
  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 3000,
  });

  const GetPostById = async () => {
    const response = await api.get<any>(`/Public/post/${props.id}`);
    return response;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", props.id],
    queryFn: async () => {
      const response = await GetPostById();
      const data = response.data.data;
      return data;
    },
    meta: {
      showMessage: false,
    },
  });

  if (isLoading) return <h1>Loading....</h1>;
  if (isError) return <h1>Error loading data!!!</h1>;

  return (
    <Row gutter={[12, 12]} style={{ margin: 0 }}>
      <Col span={12}>
        <Descriptions
          size="small"
          layout="vertical"
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
              children: `Rs. ${(data.price ?? 0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
            },
            {
              key: "description",
              label: "Description",
              children: data.description,
            },
          ]}
          labelStyle={{ fontWeight: "bold" }}
        />
      </Col>

      <Col span={12}>
        <Card title="Image gallery" size="small">
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`),
            }}
          >
            <>
              {data.image?.map((x: any) => {
                return <Image style={{ padding: 3 }} width={200} src={x} />;
              })}
            </>
          </Image.PreviewGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default HomepagePostDetails;
