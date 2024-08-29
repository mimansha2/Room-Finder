// import { lazy, Suspense } from "react";
// import { ConfigProvider, Spin, theme } from "antd";
// import {
//   BrowserRouter,
//   Route,
//   RouterProvider,
//   Routes,
//   createBrowserRouter,
// } from "react-router-dom";
// import PageRoutes from "./Routes/pageRoutes";
// import TanstackQueryConfig from "./helpers/TanstackQueryConfig";
// import ProtectedRoute from "./helpers/ProtectedRoutes";
// import { AuthProvider } from "./context/AuthContext";
// import PublicHomePage from "./Pages/PublicHomePage";
// import LoginSignup from "./Pages/Login";
// import AdminProtectedRoutes from "./helpers/ProtectedRoutes/adminProtectedRoutes";
// import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
// import Auth0ProviderWithNavigate from "./Components/Auth0ProviderWithNavigate";

// const HomePage = lazy(() => import("./Pages/HomePage"));
// const CreatePost = lazy(() => import("./Pages/Post/CreatePost"));
// const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
// const PostDetails = lazy(() => import("./Pages/Post/PostDetails"));
// const Profile = lazy(() => import("./Pages/Profile"));
// // const LoginSignup = lazy(() => import("./Pages/Login"));
// const CreateUserProfile = lazy(
//   () => import("./Pages/Profile/CreateUserProfile")
// );
// const Admin = lazy(() => import("./Pages/Admin"));
// const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard"));
// const ApprovedPosts = lazy(() => import("./Pages/Admin/ApprovedPosts"));
// // const PublicHomePage = lazy(() => import("./Pages/PublicHomePage"));
// const UnapprovedPosts = lazy(() => import("./Pages/Admin/UnapprovedPosts"));
// const ReportedPosts = lazy(() => import("./Pages/Admin/ReportedPosts"));

// // import CreatePost from "./Pages/Post/CreatePost";
// // import PageNotFound from "./Pages/PageNotFound";
// // import PostDetails from "./Pages/Post/PostDetails";
// // import Profile from "./Pages/Profile";
// // import LoginSignup from "./Pages/Login";
// // import CreateUserProfile from "./Pages/Profile/CreateUserProfile";
// // import Admin from "./Pages/Admin";
// // import AdminDashboard from "./Pages/Admin/AdminDashboard";
// // import ApprovedPosts from "./Pages/Admin/ApprovedPosts";
// // import PublicHomePage from "./Pages/PublicHomePage";
// // import UnapprovedPosts from "./Pages/Admin/UnapprovedPosts";
// // import ReportedPosts from "./Pages/Admin/ReportedPosts";

// const App = () => {
//   const router = createBrowserRouter([
//     {
//       path: "/Homepage",
//       element: <PublicHomePage />,
//     },
//     {
//       path: "/login",
//       element: <LoginSignup />,
//     },
//     {
//       path: "/",
//       element: <ProtectedRoute />,
//       children: [
//         {
//           path: "",
//           element: <HomePage />,
//         },
//         {
//           path: "/Admin",
//           element: <AdminProtectedRoutes />,
//           children: [
//             {
//               path: "",
//               element: <AdminDashboard />,
//             },
//             {
//               path: "UnapprovedPosts",
//               element: <UnapprovedPosts />,
//             },
//             {
//               path: "ApprovedPosts",
//               element: <ApprovedPosts />,
//             },
//             {
//               path: "ReportedPosts",
//               element: <ReportedPosts />,
//             },
//           ],
//         },
//         {
//           path: "/Post/:id",
//           element: <PostDetails />,
//         },
//         {
//           path: "/CreatePost",
//           element: <CreatePost />,
//         },
//         {
//           path: "/Profile",
//           element: <Profile />,
//         },
//         {
//           path: "/CreateProfile",
//           element: <CreateUserProfile />,
//         },
//         {
//           path: "*",
//           element: <PageNotFound />,
//         },
//         { ...PageRoutes },
//       ],
//     },
//   ]);

//   const { isAuthenticated } = useAuth0();

//   console.log("isAuthenticated", isAuthenticated);

//   return (
//     // <AuthProvider>
//     //   <TanstackQueryConfig>
//     //     <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
//     //       <RouterProvider router={router} />
//     //     </ConfigProvider>
//     //   </TanstackQueryConfig>
//     // </AuthProvider>
//     <BrowserRouter>
//       {/* <TanstackQueryConfig>
//         <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}> */}
//       <Auth0ProviderWithNavigate>
//         <Routes>
//           <Route path="/" element={<h1>Homepage</h1>} />
//           <Route path="/callback" element={<h1>HOMEPAGE</h1>} />
//           <Route path="*" element={<PageNotFound />} />
//         </Routes>
//       </Auth0ProviderWithNavigate>
//       {/* </ConfigProvider>
//       </TanstackQueryConfig> */}
//     </BrowserRouter>
//   );
// };

// export default App;

import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";
import { Skeleton } from "antd";
import React, { lazy, useEffect } from "react";
import PageLoader from "./Components/PageLoader";
import { AuthenticationGuard } from "./Components/AuthenticationGuard";
import PublicHomePage from "./Pages/PublicHomePage";
import HomePage from "./Pages/HomePage";
import AppLayout from "./Components/Layout";
import { jwtDecode } from "jwt-decode";
import { AuthProvider } from "./context/AuthContext";
import CreatePost from "./Pages/Post/CreatePost";
const CreateUserProfile = lazy(
  () => import("./Pages/Profile/CreateUserProfile")
);
const Profile = lazy(() => import("./Pages/Profile"));
const PostDetails = lazy(() => import("./Pages/Post/PostDetails"));
const Admin = lazy(() => import("./Pages/Admin"));
const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard"));
const UnapprovedPosts = lazy(() => import("./Pages/Admin/UnapprovedPosts"));
const ApprovedPosts = lazy(() => import("./Pages/Admin/ApprovedPosts"));
const ReportedPosts = lazy(() => import("./Pages/Admin/ReportedPosts"));

const App = () => {
  const {
    logout,
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    error,
    user,
    getIdTokenClaims,
    getAccessTokenSilently,
  } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  // useEffect(() => {
  //   // const userRoles = user?.["https://dev-u78k2kin20rm4026.us.auth0.com/roles"]; // Replace with your namespace
  //   // console.log("userRoles", userRoles);
  //   // getIdTokenClaims().then((res) => {
  //   //   console.log("res", res);
  //   // });

  //   // getIdTokenClaims().then((res) => {
  //   //   // const token = res?.__raw.split(" ")[1];
  //   //   if (res) {
  //   //     console.log("res", res);
  //   //     const decoded = jwtDecode(res.__raw);
  //   //     console.log("decoded", decoded);
  //   //   }
  //   // });

  //   getAccessTokenSilently().then((res) => {
  //     const decoded = jwtDecode(res);
  //     console.log("res", decoded);
  //   });
  // }, [user]);

  // useEffect(() => {
  //   if (isLoading) return;
  //   if (!isAuthenticated) {
  //     loginWithRedirect({
  //       appState: {
  //         returnTo: "/",
  //       },
  //     });
  //   }
  // }, [isAuthenticated]);

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Routes>
      <Route path="/public" element={<PublicHomePage />} />
      <Route
        path="/"
        element={
          <AuthProvider>
            <AuthenticationGuard component={AppLayout} />
          </AuthProvider>
        }
      >
        <Route path="" element={<HomePage />} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path="/CreateProfile" element={<CreateUserProfile />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Post/:id" element={<PostDetails />} />
        <Route path="/Admin" element={<Admin />}>
          <Route path="" element={<AdminDashboard />} />
          <Route path="UnapprovedPosts" element={<UnapprovedPosts />} />
          <Route path="ApprovedPosts" element={<ApprovedPosts />} />
          <Route path="ReportedPosts" element={<ReportedPosts />} />
        </Route>
      </Route>
      <Route path="/callback" element={<h1>CALLBACK HOMEPAGE</h1>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
