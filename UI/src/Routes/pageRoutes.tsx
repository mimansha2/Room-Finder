import { RouteProps } from "react-router-dom";
import CreatePost from "../Pages/Post/CreatePost";
import PageNotFound from "../Pages/PageNotFound";

const PageRoutes = (): RouteProps[] => {
  return [
    {
      path: "CreatePost",
      element: <CreatePost />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ];
};

export default PageRoutes;
