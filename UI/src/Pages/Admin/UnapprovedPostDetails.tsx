import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Col,
  Descriptions,
  Row,
  Image,
  Typography,
  notification,
} from "antd";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../context/AuthContext";

const UnapprovedPostDetails = (props: { data: any }) => {
  const { data } = props;

  const api = useApi("UserProfile");
  const postApi = useApi("Posts");
  const { user } = useAuth();

  const GetUserProfile = async () => {
    const response = await api.getById<any>("", data.userId ?? "");
    return response;
  };

  const { data: userdata, isLoading } = useQuery({
    queryKey: ["profile", data.userId],
    queryFn: async () => {
      const response = await GetUserProfile();
      const data = response.data;
      return data;
    },
    meta: {
      showMessage: false,
    },
  });

  if (isLoading) return <Typography>Loading...</Typography>;

  //   const approvePost = async () => {
  //     try {
  //       await postApi.put("approve", { postId: user?.userId });
  //       notification.success({ message: "Post approved successfully" });
  //     } catch (error: any) {
  //       notification.error(error.message ?? "Error while approving post");
  //     }
  //   };

  return (
    <>
      <Row gutter={[12, 12]}>
        <Col xs={24} lg={24}>
          <Descriptions
            bordered
            items={[
              {
                key: "userName",
                label: "Owner",
                children: `${userdata.firstName} ${userdata.lastName}`,
              },
              {
                key: "contactNo",
                label: "Contact Number",
                children: userdata.mobileNo,
              },
              {
                key: "gender",
                label: "Gender",
                children: userdata.gender,
              },
              {
                key: "nationality",
                label: "Nationality",
                children: userdata.nationality,
              },
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
                span: 1,
                key: "description",
                label: "Description",
                children: data.description,
              },
            ]}
            // layout="vertical"
            labelStyle={{ fontWeight: "bold" }}
            column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }}
            size="small"
          />
        </Col>
      </Row>

      <br />

      <Row gutter={[12, 12]} style={{ margin: 0 }}>
        <Card title="Image gallery" size="small">
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
    </>
  );
};

export default UnapprovedPostDetails;
