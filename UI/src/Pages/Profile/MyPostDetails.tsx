import {
  Avatar,
  Button,
  Card,
  Col,
  Drawer,
  List,
  Modal,
  Popconfirm,
  Table,
  TableProps,
  Typography,
  notification,
} from "antd";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PostDetails from "../Post/PostDetails";
import EditMyPost from "./EditMyPost";
import { DeleteFilled, EditFilled, EyeOutlined } from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";

const MyPostDetails = () => {
  const api = useApi("Posts");
  const { user } = useAuth0();
  const queryClient = useQueryClient();
  const [postId, setPostId] = useState<string | undefined>(undefined);
  const [editPost, setEditPost] = useState<any>(undefined);

  const GetPosts = async () => {
    const response = await api.getById<any>(
      "getByUserId",
      user?.nickname ?? ""
    );
    return response;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", { userName: user?.nickname }],
    queryFn: async () => {
      const response = await GetPosts();
      const data = response.data;
      return data;
    },
    meta: {
      showMessage: true,
    },
  });

  const removePost = async (postId: string) => {
    try {
      await api.remove(postId);
      queryClient.invalidateQueries({
        queryKey: ["post", { userId: user?.userId }],
      });
    } catch (error: any) {
      console.log(error);
      notification.error({
        placement: "bottomLeft",
        message: error.response.data.message,
      });
    }
  };

  const columns: TableProps["columns"] = [
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "BHK",
      dataIndex: "bhk",
      key: "bhk",
      render: (_, row) => {
        return `${row.bedroom}B${row.hall > 0 ? "H" : ""}${
          row.kitchen > 0 ? "K" : ""
        }`;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render(_, record) {
        return (
          <Typography.Text>
            {new Date(record.createdAt).toDateString()}
          </Typography.Text>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            icon={<EyeOutlined />}
            type="text"
            onClick={() => setPostId(record._id)}
          />
          <Button
            icon={<EditFilled />}
            type="text"
            onClick={() => setEditPost(record)}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Modal
        footer={[]}
        open={postId !== undefined}
        onCancel={(e) => {
          e.preventDefault();
          setPostId(undefined);
        }}
        width={1000}
      >
        {postId && <PostDetails id={postId} />}
      </Modal>

      <Drawer
        title="Edit Post"
        autoFocus
        width={"100%"}
        open={editPost !== undefined}
        onClose={(e) => {
          e.preventDefault();
          setEditPost(undefined);
        }}
        extra={
          <Button type="primary" size="small" htmlType="submit" form="editPost">
            Submit
          </Button>
        }
      >
        {editPost && (
          <EditMyPost
            formValues={editPost}
            onClose={() => setEditPost(undefined)}
          />
        )}
      </Drawer>

      <Col xs={24} md={24} lg={24}>
        <Card size="small" title="Approved Posts" loading={isLoading}>
          <Table
            size="small"
            columns={columns}
            dataSource={
              data
                ? data.map((x: any) => {
                    return {
                      ...x,
                      key: x._id,
                    };
                  })
                : []
            }
          />

          {/* <List
            style={{ maxHeight: 300, overflow: "auto" }}
            size="small"
            itemLayout="horizontal"
            dataSource={data ?? []}
            renderItem={(item: any, index) => (
              <List.Item
                actions={[
                  <Button
                    icon={<EyeOutlined />}
                    type="text"
                    onClick={() => setPostId(item._id)}
                  />,
                  <Button
                    icon={<EditFilled />}
                    type="text"
                    onClick={() => setEditPost(item)}
                  />,
                  <Popconfirm
                    title="Delete this post"
                    description="Are you you want to delete this post?"
                    onConfirm={() => {
                      removePost(item._id);
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger icon={<DeleteFilled />} type="text" />
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                    />
                  }
                  title={<a href="https://ant.design">{item.location}</a>}
                  description={item.description}
                />
              </List.Item>
            )}
          /> */}
        </Card>
      </Col>
    </>
  );
};

export default MyPostDetails;
