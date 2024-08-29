import { useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "../../../hooks/useApi";
import { Button, notification, Space, Table, Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import ApprovedPostDetail from "./detail";
import { useAuth } from "../../../context/AuthContext";

const controllerName = "Posts";

const ApprovedPosts = () => {
  const api = useApi(controllerName);
  const GetPosts = async () => {
    const response = await api.get<any>("");
    return response;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const response = await GetPosts();
      console.log("response", response);
      const data = response.data.data;
      return data;
    },
    meta: {
      showMessage: false,
    },
  });

  const [detailData, setDetailData] = useState<any>(null);
  const queryClient = useQueryClient();

  const removePost = async () => {
    try {
      const postId = detailData._id;
      await api.remove(postId);
      await queryClient.invalidateQueries({
        queryKey: ["post"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["getUnapprovedPosts"],
      });
      setDetailData(null);
    } catch (error: any) {
      console.log(error);
      notification.error({
        placement: "bottomLeft",
        message: error.response.data.message,
      });
    }
  };

  return (
    <>
      {detailData && (
        <ApprovedPostDetail
          data={detailData}
          onClose={setDetailData}
          onDelete={() => removePost()}
        />
      )}
      <Table
        size="small"
        loading={isLoading}
        columns={[
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
                      console.log("value", value);
                      setDetailData(value);
                    }}
                  />
                </Space>
              );
            },
          },
        ]}
        dataSource={data}
        bordered
        title={() => "Approved Posts"}
      />
    </>
  );
};

export default ApprovedPosts;
