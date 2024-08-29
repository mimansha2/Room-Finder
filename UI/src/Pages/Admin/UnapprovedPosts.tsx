import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Modal,
  notification,
  Space,
  Table,
  TableProps,
  Typography,
} from "antd";
import useApi from "../../hooks/useApi";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import UnapprovedPostDetails from "./UnapprovedPostDetails";

const controllerName = "Posts";

const UnapprovedPosts = () => {
  const [postDetails, setPostDetails] = useState<any>(null);

  const columns: TableProps<any>["columns"] = [
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "BHK",
      dataIndex: "",
      render(value) {
        return (
          <Typography.Text>{`${value.bedroom}B${
            value.hall > 1 ? value.hall : ""
          }H${value.kitchen > 1 ? value.kitchen : ""}K`}</Typography.Text>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "right",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "View",
      align: "center",
      render(value) {
        return (
          <Space size="middle">
            <Button
              icon={<EyeOutlined />}
              size="small"
              type="text"
              onClick={() => {
                setPostDetails(value);
              }}
            />
            {/* <Button
              icon={<CheckCircleOutlined />}
              size="small"
              type="text"
              onClick={() => {
                setPostDetails(value);
                setTimeout(() => {
                  approvePost();
                }, 3000);
              }}
            />
            <Button icon={<DeleteOutlined />} size="small" type="text" danger /> */}
          </Space>
        );
      },
    },
  ];

  const api = useApi(controllerName);
  const GetPosts = async () => {
    const response = await api.get<any>("getUnapprovedPosts");
    return response;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getUnapprovedPosts"],
    queryFn: async () => {
      const response = await GetPosts();
      const data = response.data.data;
      return data;
    },
    meta: {
      showMessage: false,
    },
  });

  const queryClient = useQueryClient();
  const approvePost = async () => {
    try {
      if (postDetails) {
        await api.patch("approve", { postId: postDetails._id });
        notification.success({
          message: "Post approved successfully",
          placement: "bottomLeft",
        });
        await queryClient.invalidateQueries({
          queryKey: ["post"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["getUnapprovedPosts"],
        });
      }
    } catch (error: any) {
      notification.error(error.message ?? "Error while approving post");
    }

    setPostDetails(null);
  };

  const rejectPost = async () => {
    try {
      if (postDetails) {
        await api.patch("reject", { postId: postDetails._id });
        notification.success({ message: "Post removed successfully" });
        await queryClient.invalidateQueries({
          queryKey: ["post"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["getUnapprovedPosts"],
        });
      }
    } catch (error: any) {
      notification.error(error.message ?? "Error while rejecting post");
    }

    setPostDetails(null);
  };

  return (
    <>
      <Modal
        title="Post Detail"
        footer={[
          <Button size="middle" danger type="primary" onClick={rejectPost}>
            Reject
          </Button>,
          <Button size="middle" type="primary" autoFocus onClick={approvePost}>
            Approve
          </Button>,
        ]}
        open={!!postDetails}
        width={1000}
        onCancel={() => {
          setPostDetails(null);
        }}
        destroyOnClose
      >
        <UnapprovedPostDetails data={postDetails} />
      </Modal>

      <Table
        size="small"
        loading={isLoading}
        columns={columns}
        dataSource={data}
        bordered
        title={() => "Unapproved Posts"}
      />
    </>
  );
};

export default UnapprovedPosts;
