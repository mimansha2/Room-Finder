import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  Carousel,
  Col,
  List,
  Modal,
  Result,
  Row,
  Typography,
} from "antd";
import { useState } from "react";
import HomepagePostDetails from "./HomepagePostDetails";
import axios from "axios";

const controllerName = "Posts";

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 3000,
});

const HomepagePosts = () => {
  const navigate = useNavigate();

  const GetPosts = async () => {
    const response = await publicApi.get<any>("/Public/");
    return response;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const response = await GetPosts();
      const data = response.data.data;
      return data;
    },
    meta: {
      showMessage: false,
    },
  });

  const [open, setOpen] = useState<boolean>(false);
  const [postId, setPostId] = useState<string>("");

  if (isLoading) return <h1>Loading...</h1>;
  if (!data)
    return (
      <Result
        status="500"
        title="Please wait a minute and try again as the server might be starting."
        extra={
          <Button
            type="primary"
            key="console"
            onClick={() => window.location.reload()}
          >
            Reload
          </Button>
        }
      />
    );

  return (
    <>
      <Modal
        title="Post Details"
        open={open}
        onCancel={() => setOpen(false)}
        footer={[
          <Typography.Text
            strong
            style={{ display: "flex", justifyContent: "center" }}
          >
            Sign in to see the owner contact information
          </Typography.Text>,
        ]}
        width={1000}
      >
        <HomepagePostDetails id={postId} />
      </Modal>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 4,
          xl: 5,
          xxl: 6,
        }}
        dataSource={data ?? []}
        renderItem={(item: any) => (
          <List.Item>
            <Card
              size="small"
              hoverable
              cover={
                // <img alt="home" height={200} src={item.image?.[0]} />
                <Carousel
                  // arrows
                  infinite={true}
                  fade={true}
                  autoplay
                  draggable
                  pauseOnHover
                >
                  {item.image?.length > 0 ? (
                    item.image.map((value: string) => (
                      <div>
                        <img
                          key={value}
                          width={"100%"}
                          height={200}
                          src={value}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ))
                  ) : (
                    <img
                      width={"100%"}
                      height={200}
                      style={{ objectFit: "cover" }}
                      src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                    />
                  )}
                </Carousel>
              }
              onClick={() => {
                setOpen(true);
                setPostId(item._id);
              }}
            >
              <Row>
                <Col span={12}>
                  <Typography.Text>{item.location}</Typography.Text>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <Typography.Text strong>{`Rs.${item.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Typography.Text>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Typography.Text>
                    {new Date(item.createdAt).toDateString()}
                  </Typography.Text>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <Typography.Text strong>{`${item.bedroom}B${
                    item.hall > 1 ? item.hall : ""
                  }H${item.kitchen > 1 ? item.kitchen : ""}K`}</Typography.Text>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default HomepagePosts;
