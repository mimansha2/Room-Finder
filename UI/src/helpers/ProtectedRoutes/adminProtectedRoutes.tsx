// import { Navigate, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { lazy } from "react";
// import { Button, Result } from "antd";
// const Admin = lazy(() => import("../../Pages/Admin"));

// const AdminProtectedRoutes = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   return user?.role === "admin" ? (
//     <Admin />
//   ) : (
//     <Result
//       status="403"
//       title="403"
//       subTitle="Sorry, you are not authorized to access this page."
//       extra={
//         <Button
//           type="primary"
//           onClick={() => navigate("/Homepage", { replace: true })}
//         >
//           Back Home
//         </Button>
//       }
//     />
//   );
// };

// export default AdminProtectedRoutes;
