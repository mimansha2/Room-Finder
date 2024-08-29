// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { Button, Form, Input, message, Typography } from "antd";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import useApi from "../../hooks/useApi";

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const api = useApi("login");
//   const [messageApi, contextHolder] = message.useMessage();

//   const onFinish = async (values: any) => {
//     try {
//       const { data }: any = await api.post("", {
//         userName: values.username,
//         password: values.password,
//       });

//       if (!data) {
//         messageApi.error(
//           "Server is not responding please wait for a minute and try again"
//         );
//         return;
//       }

//       messageApi.success("User credientials matched");
//       messageApi.loading("Redirecting");

//       login(data); // sending response to localstorage.

//       setTimeout(() => {
//         navigate("/", { replace: true });
//       }, 2000);
//     } catch (error: any) {
//       if (!error.response) {
//         messageApi.error(
//           "Server is not responding please wait for a minute and try again"
//         );
//       } else {
//         messageApi.error(
//           error.response.data.message ?? "Invalid user credientials"
//         );
//       }
//     }
//   };

//   return (
//     <>
//       {contextHolder}
//       <Form name="loginForm" onFinish={onFinish}>
//         <Form.Item
//           name="username"
//           rules={[{ required: true, message: "Please input your Username!" }]}
//         >
//           <Input
//             autoFocus
//             prefix={<UserOutlined className="site-form-item-icon" />}
//             placeholder="Username"
//           />
//         </Form.Item>
//         <Form.Item
//           name="password"
//           rules={[{ required: true, message: "Please input your Password!" }]}
//         >
//           <Input
//             prefix={<LockOutlined className="site-form-item-icon" />}
//             type="password"
//             placeholder="Password"
//           />
//         </Form.Item>

//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="login-form-button"
//           >
//             Log in
//           </Button>
//         </Form.Item>

//         <hr />
//         <Typography.Text type="danger" style={{ margin: 0, padding: 0 }}>
//           Only for demo use of admin role. <br /> username: admin, password:
//           admin
//         </Typography.Text>

//         <hr />
//         <Typography.Text type="success" style={{ margin: 0, padding: 0 }}>
//           Please create an user and use the application
//         </Typography.Text>
//       </Form>
//     </>
//   );
// };

// export default LoginForm;
