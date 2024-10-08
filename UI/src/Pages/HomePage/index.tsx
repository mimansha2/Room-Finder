import { Button, Card, Empty, Layout, Result, Row, Spin, theme } from "antd";
import PostsCard from "../../Components/PostsCard";
import useApi from "../../hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import FilterForm from "../../Components/FilterForm";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";

const controllerName = "Posts";

// TODO need to implement pagination in fetching posts.

const HomePage = () => {
  const [postData, setPostData] = useState<[]>([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const api = useApi(controllerName);
  const navigate = useNavigate();

  const GetPosts = async () => {
    const response = await api.get<any>("");
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

  useEffect(() => {
    setPostData(data);
  }, [data]);

  if (isLoading) return <Spin fullscreen />;
  if (isError)
    return (
      <Result
        status="error"
        title="There are some problems with your operation."
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

  if (data.length === 0) {
    return (
      <Card>
        <Empty
          description="No posts created"
          children={
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusOutlined />}
              onClick={() => {
                navigate("/createPost");
              }}
            >
              Create Now
            </Button>
          }
        />
      </Card>
    );
  }

  const filterFunction = (formValues: any) => {
    console.log("postData", postData);
    // const filteredOutput = postData.filter((x) =>
    //   Object.entries(formValues).every(([key, value]) => x[key] === value)
    // );
    let filteredOutput = data.filter(
      (x: any) =>
        x.location
          .toLowerCase()
          .includes(formValues.location?.toLowerCase() ?? "") &&
        x.bedroom >= Number(formValues.bedroom ?? 0) &&
        x.hall >= Number(formValues.hall ?? 0) &&
        x.kitchen >= Number(formValues.kitchen ?? 0)
    );

    if (formValues.priceRange?.length > 0) {
      filteredOutput = filteredOutput.filter(
        (x: any) =>
          x.price >= formValues.priceRange[0] &&
          x.price <= formValues.priceRange[1]
      );
    }

    if (formValues.dateRange?.length > 0) {
      filteredOutput = filteredOutput.filter(
        (x: any) =>
          new Date(x.createdAt) >= new Date(formValues.dateRange[0]) &&
          new Date(x.createdAt) <= new Date(formValues.dateRange[1])
      );
    }

    setPostData(filteredOutput);
    setPostData(filteredOutput);
  };

  return (
    <Layout>
      <Sider
        style={{
          background: "#FFFFFF",
          padding: 10,
          borderRadius: 5,
        }}
        width={250}
      >
        <FilterForm
          onFormValueChange={(formValues) => {
            console.log("got", formValues);
            filterFunction(formValues);
          }}
        />
      </Sider>
      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        <Row>
          {postData?.map((x: any) => {
            return (
              <PostsCard
                key={x._id}
                postId={x._id}
                location={x.location}
                price={x.price}
                bedroom={x.bedroom}
                hall={x.hall}
                kitchen={x.kitchen}
                uploadedDate={x.createdAt}
                likes={x.likes}
                reports={x.reports}
                image={x.image}
              />
            );
          })}
        </Row>
      </Content>
    </Layout>
    // <Card size="small">
    //   <Row>
    //     {data.map((x: any) => {
    //       return (
    //         <PostsCard
    //           key={x._id}
    //           postId={x._id}
    //           location={x.location}
    //           price={x.price}
    //           bedroom={x.bedroom}
    //           hall={x.hall}
    //           kitchen={x.kitchen}
    //           uploadedDate={x.createdAt}
    //           likes={x.likes}
    //           reports={x.reports}
    //           image={x.image}
    //         />
    //       );
    //     })}
    //   </Row>
    // </Card>
  );
};

export default HomePage;
