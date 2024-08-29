import {
  InfoCircleTwoTone,
  LikeFilled,
  LikeOutlined,
  WarningFilled,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  Carousel,
  Col,
  Popconfirm,
  Row,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

type PostsCardProps = {
  postId: string;
  location: string;
  price: string;
  bedroom: number;
  hall: number;
  kitchen: number;
  uploadedDate: string;
  likes: string[];
  reports: string[];
  image: string[];
};

const controllerName = "Posts";

const PostsCard = (props: PostsCardProps) => {
  const navigate = useNavigate();
  const api = useApi(controllerName);
  const { user } = useAuth0();
  const queryClient = useQueryClient();

  const [totalLikes, setTotalLikes] = useState(props.likes.length);
  const [isLikedByMe, setIsLikedByMe] = useState<boolean>(
    props.likes.some((x) => x === user?.nickname)
  );

  const [totalReports, setTotalReports] = useState(props.reports?.length ?? 0);
  const [isReportedByMe, setIsReportedByMe] = useState<boolean>(
    props.reports?.some((x) => x === user?.nickname)
  );

  const isDateOlderThanADay = () => {
    var currentDate = new Date();

    var dayAgoDate = new Date();
    dayAgoDate.setDate(currentDate.getDate() - 1);

    var inputDate = new Date(props.uploadedDate);

    return inputDate < dayAgoDate;
  };

  const LikePost = async () => {
    const response = await api.put<any>("like", {
      userName: user?.nickname,
      postId: props.postId,
    });
    return response;
  };

  const likeMutation = useMutation({
    mutationFn: LikePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post/like", user?.nickname],
      });
      queryClient.invalidateQueries({
        queryKey: ["post", props.postId],
      });
      setTotalLikes((value) => value + 1);
      setIsLikedByMe(true);
    },
  });

  const UnlikePost = async () => {
    const response = await api.put<any>("unlike", {
      userName: user?.nickname,
      postId: props.postId,
    });
    return response;
  };

  const unlikeMutation = useMutation({
    mutationFn: UnlikePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post/unlike", user?.nickname],
      });
      queryClient.invalidateQueries({
        queryKey: ["post", props.postId],
      });
      setTotalLikes((value) => value - 1);
      setIsLikedByMe(false);
    },
  });

  const ReportPost = async () => {
    const response = await api.put<any>("report", {
      // userId: user?.userId,
      postId: props.postId,
    });
    return response;
  };

  const reportMutation = useMutation({
    mutationFn: ReportPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post/report", user?.nickname],
      });
      queryClient.invalidateQueries({
        queryKey: ["post", props.postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["reportedPosts"],
      });
      setTotalReports((value) => value + 1);
      setIsReportedByMe(true);
    },
  });

  const UnReportPost = async () => {
    const response = await api.put<any>("unreport", {
      // userId: user?.userId,
      postId: props.postId,
    });
    return response;
  };

  const unreportMutation = useMutation({
    mutationFn: UnReportPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post/unreport", user?.nickname],
      });
      queryClient.invalidateQueries({
        queryKey: ["post", props.postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["reportedPosts"],
      });

      setTotalReports((value) => value - 1);
      setIsReportedByMe(false);
    },
  });

  return (
    <Col span={6} xs={24} sm={24} md={12} lg={8} xl={6} xxl={6}>
      <Badge.Ribbon
        text="New"
        style={{ display: isDateOlderThanADay() ? "none" : "block" }}
      >
        <Card
          style={{ margin: 10 }}
          hoverable
          size="small"
          loading={false}
          cover={
            <Carousel
              // arrows
              infinite={true}
              fade={true}
              autoplay
              draggable
              pauseOnHover
            >
              {props.image?.length > 0 ? (
                props.image.map((value: string) => (
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
          actions={[
            <Button
              size="small"
              type="text"
              style={{ color: "#4267b2" }}
              icon={isLikedByMe ? <LikeFilled /> : <LikeOutlined />}
              iconPosition={"end"}
              onClick={(e) => {
                e.preventDefault();
                isLikedByMe ? unlikeMutation.mutate() : likeMutation.mutate();
              }}
            >
              {totalLikes > 0 ? totalLikes : "No Likes"}
            </Button>,
            <Popconfirm
              title={isReportedByMe ? "Unreport this post" : "Report this post"}
              description={
                isReportedByMe
                  ? "Are you you want to unreport this post?"
                  : "Are you you want to report this post?"
              }
              okButtonProps={{ loading: reportMutation.isPending }}
              onConfirm={() => {
                isReportedByMe
                  ? unreportMutation.mutate()
                  : reportMutation.mutate();
              }}
              // onCancel={() => {
              //   console.log("cancelled");
              // }}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{ color: "orange" }}
                size="small"
                type="text"
                icon={isReportedByMe ? <WarningFilled /> : <WarningOutlined />}
                iconPosition="end"
              >
                {totalReports > 0 ? totalReports : "0"}
              </Button>
            </Popconfirm>,
            <InfoCircleTwoTone
              onClick={() => {
                navigate(`Post/${props.postId}`);
              }}
              style={{ color: "green" }}
            />,
            // </Popconfirm>,
            // <Button
            //   type="text"
            //   icon={isReportedByMe ? <WarningOutlined /> : <WarningFilled />}
            //   iconPosition="end"
            //   onClick={(e) => {
            //     e.preventDefault();
            //     isLikedByMe ? unlikeMutation.mutate() : likeMutation.mutate();
            //   }}
            // />,
            // <InfoCircleTwoTone
            //   onClick={() => {
            //     navigate(`Post/${props.postId}`);
            //   }}
            //   style={{ color: "green" }}
            // />,
          ]}
        >
          <Row>
            <Col span={12}>
              <Typography.Text>{props.location}</Typography.Text>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Typography.Text strong>
                {`Rs.${props.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
              </Typography.Text>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Typography.Text>
                {new Date(props.uploadedDate).toDateString()}
              </Typography.Text>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Typography.Text strong>{`${props.bedroom}B${
                props.hall > 1 ? props.hall : ""
              }H${props.kitchen > 1 ? props.kitchen : ""}K`}</Typography.Text>
            </Col>
          </Row>
        </Card>
      </Badge.Ribbon>
    </Col>
  );
};

export default PostsCard;
