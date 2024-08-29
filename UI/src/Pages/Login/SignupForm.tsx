// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { Button, Form, Input, message, notification } from "antd";
// import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
// import useApi from "../../hooks/useApi";

// interface SignupFormDetails {
//   email: string;
//   userName: string;
//   password: string;
//   confirmPassword: string;
// }

// const SignUpForm = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const api = useApi("signup");
//   const [messageApi, contextHolder] = message.useMessage();

//   const onFinish = async (values: SignupFormDetails) => {
//     if (values.password !== values.confirmPassword) {
//       notification.error({
//         message: "Passwords doesn't match",
//         placement: "bottomLeft",
//       });
//       return;
//     }

//     try {
//       const { data }: any = await api.post("", {
//         userName: values.userName,
//         email: values.email,
//         password: values.password,
//       });
//       messageApi.success("User signed up");
//       messageApi.loading("Redirecting");
//       setTimeout(() => {
//         login(data);
//         navigate("/");
//       }, 2000);
//     } catch (error: any) {
//       messageApi.error(error.response.data.message);
//     }
//   };

//   return (
//     <>
//       {contextHolder}
//       <Form name="signupForm" onFinish={onFinish}>
//         <Form.Item
//           name="email"
//           rules={[
//             {
//               type: "email",
//               required: true,
//             },
//           ]}
//         >
//           <Input autoFocus prefix={<MailOutlined />} placeholder="Email" />
//         </Form.Item>
//         <Form.Item name="userName" rules={[{ required: true }]}>
//           <Input prefix={<UserOutlined />} placeholder="Username" />
//         </Form.Item>
//         <Form.Item name="password" rules={[{ required: true }]}>
//           <Input
//             prefix={<LockOutlined />}
//             type="password"
//             placeholder="Password"
//           />
//         </Form.Item>
//         <Form.Item name="confirmPassword" rules={[{ required: true }]}>
//           <Input
//             prefix={<LockOutlined />}
//             type="password"
//             placeholder="Confirm Password"
//           />
//         </Form.Item>

//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="signup-form-button"
//           >
//             Sign Up
//           </Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
// };

// export default SignUpForm;
