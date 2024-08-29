// import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
// import { Card, ConfigProvider, Segmented, theme, Typography } from "antd";
// import LoginForm from "./LoginForm";
// import SignUpForm from "./SignupForm";
// import { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// enum FormOption {
//   Login = 1,
//   Signup,
// }

// const LoginSignup = () => {
//   const [currentForm, setCurrentForm] = useState<FormOption>(FormOption.Login);

//   const { user } = useAuth();
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, []);

//   return (
//     <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           minHeight: "100vh",
//           backgroundImage:
//             "url(" +
//             "https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" +
//             ")",
//           backgroundPosition: "center",
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         <Card
//           title={
//             <Segmented
//               size="small"
//               options={[
//                 {
//                   label: "Login",
//                   value: FormOption.Login,
//                   icon: <LoginOutlined />,
//                 },
//                 {
//                   label: "SignUp",
//                   value: FormOption.Signup,
//                   icon: <UserAddOutlined />,
//                 },
//               ]}
//               onChange={setCurrentForm}
//             />
//           }
//           style={{ width: 400, paddingBottom: 0 }}
//         >
//           {currentForm === FormOption.Login ? <LoginForm /> : <SignUpForm />}
//         </Card>
//       </div>
//     </ConfigProvider>
//   );
// };

// export default LoginSignup;
