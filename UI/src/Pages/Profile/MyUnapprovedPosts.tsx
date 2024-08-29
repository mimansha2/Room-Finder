import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import useApi from "../../hooks/useApi";
import {
  Avatar,
  Button,
  Card,
  List,
  Modal,
  Popconfirm,
  Table,
  TableProps,
  Typography,
} from "antd";
import { EyeOutlined, EditFilled, DeleteFilled } from "@ant-design/icons";
import { useState } from "react";
import PostDetails from "../Post/PostDetails";

const MyUnapprovedPosts = () => {
  const api = useApi("Notification");
  const [postId, setPostId] = useState<string | undefined>(undefined);

  const GetPosts = async () => {
    const response = await api.get<any>("getUnApprovedPosts");
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["unApprovedPosts"],
    queryFn: async () => {
      const response = await GetPosts();
      const data = response.data;
      return data ?? [];
    },
    meta: {
      showMessage: true,
    },
  });

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
        <Button
          icon={<EyeOutlined />}
          type="text"
          onClick={() => setPostId(record._id)}
        />
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

      <Card size="small" title="Unapproved Posts" loading={isLoading}>
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
    </>
  );
};

export default MyUnapprovedPosts;
