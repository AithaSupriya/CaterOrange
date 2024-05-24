import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useAuth } from "../Hooks/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/LoginScreen.css";

const Loginpage = ({ openSignup }) => {
  const { login } = useAuth();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const onFinish = async () => {
    try {
      setEmail("");
      setPassword("");
      const response = await axios.post(`${backendUrl}/api/login`, {
        email,
        password,
      });
      console.log(response);
      if (response.data.token) {
        const { token, user } = response.data;
        const { _id: id } = user;
        console.log("Received token:", token);
        console.log("Received id:", id);
        await login(token, id);
        redirectToHomePage();
        console.log("Login successful");
      } else {
        console.log("Login failed");
        setLoginError(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const redirectToPage = () => {
    openSignup(); // Function to open the signup modal from Navbar component
  };

  const redirectToForgotPassword = () => {
    window.location.href = "/forgot-password";
  };

  const redirectToHomePage = () => {
    window.location.href = "/";
  };

  return (
    <Form onFinish={onFinish}>
      <div className="login-right-inner">
        <span style={{ textAlign: "left", fontSize: "30px" }}>Welcome</span>
        <div>
          {loginError && (
            <div style={{ color: "red", textAlign: "left" }}>
              Login failed. Please check your credentials.
            </div>
          )}
          <Form.Item
            style={{ marginBottom: 0, textAlign: "left" }}
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              type="email"
              placeholder="Company Email"
              style={{ height: "4rem" }}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            style={{ marginBottom: 0, textAlign: "left" }}
            name="password"
            rules={[
              {
                type: "password",
                message: "The input is not valid Password !",
              },
              {
                required: true,
                message: "Please input your Password !",
              },
            ]}
          >
            <Input.Password
              placeholder="input password"
              style={{ height: "4rem" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </div>
        <span
          style={{
            textAlign: "left",
            color: "blue",
            fontWeight: "bolder",
            cursor: "pointer",
          }}
          onClick={redirectToForgotPassword}
        >
          Forgot Password ?
        </span>
        <div style={{ textAlign: "right" }}>
          <Button
            style={{
              width: "6rem",
              height: "2.5rem",
              marginRight: "8px",
            }}
            onClick={redirectToPage}
          >
            Signup
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "6rem", height: "2.5rem" }}
          >
            Login
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Loginpage;






// import React, { useState } from "react";
// import { Button, Form, Input ,Modal } from "antd";
// import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import { useAuth } from "../Hooks/authContext";

// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/LoginScreen.css";


// const Loginpage = () => {

//   const { login } = useAuth();
//   const redirectToPage = () => {
//     window.location.href = "/signup";
//   };
//   const redirectToHomePage = () => {
//     window.location.href = "/";
//   };
//   const redirectToForgotPassword = () =>{
//     window.location.href = "/forgot-password";
//   }
//   const backendUrl = process.env.REACT_APP_BACKEND_URL;

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginError, setLoginError] = useState(false);
//   const navigate = useNavigate();

//   const onFinish = async () => {
//     try {
//       setEmail("");
//       setPassword("");

//       // const response = await axios.post("https://caterorange-bakend.vercel.app/api/login", {
//       const response = await axios.post(`${backendUrl}/api/login`, {
//         email,
//         password,
//       });
//       console.log(response);
//       if (response.data.token) {
//         const { token, user } = response.data;
//       const { _id: id } = user;
//         console.log("Received token:", token);
//         console.log("Received id:", id);
  
//         // localStorage.setItem("token", token);
//         // localStorage.setItem("id", id);
//         await login(token, id );
//         redirectToHomePage();
//         console.log("Login successful");
//       } else {
//         console.log("Login failed");
//         setLoginError(true);
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       // console.log("Login failed");
//       // setLoginError(true);
//     }
//   };
//   return (
//     <Form onFinish={onFinish}>
//       <div className="login-right-inner">
//         <span style={{ textAlign: "left", fontSize: "50px" }}>Welcome</span>
//         <div>
//           {loginError && (
//             <div style={{ color: "red", textAlign: "left" }}>
//               Login failed. Please check your credentials.
//             </div>
//           )}
//           <Form.Item
//             style={{ marginBottom: 0, textAlign: "left" }}
//             name="email"
//             rules={[
//               {
//                 type: "email",
//                 message: "The input is not valid E-mail!",
//               },
//               {
//                 required: true,
//                 message: "Please input your E-mail!",
//               },
//             ]}
//           >
//             <Input
//               type="email"
//               placeholder="Company Email"
//               style={{ height: "4rem" }}
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Form.Item>
//         </div>
//         <div>
//           <Form.Item
//             style={{ marginBottom: 0, textAlign: "left" }}
//             name="password"
//             rules={[
//               {
//                 type: "password",
//                 message: "The input is not valid Password !",
//               },
//               {
//                 required: true,
//                 message: "Please input your Password !",
//               },
//             ]}
//           >
//             <Input.Password
//               placeholder="input password"
//               style={{ height: "4rem" }}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               iconRender={(visible) =>
//                 visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//               }
//             />
//           </Form.Item>
//         </div>
//         <span
//           style={{ textAlign: "left", color: "blue", fontweight: "bolder", cursor: "pointer" }}
//           onClick={redirectToForgotPassword}
//         >
//           Forgot Password ?
//         </span>
//         <div style={{ textAlign: "right" }}>
//           <Button
//             style={{ width: "6rem", height: "2.5rem", marginRight: "8px" }}
//             onClick={redirectToPage}
//           >
//             Signup
//           </Button>
//           <Button
//             type="primary"
//             htmlType="submit"
//             style={{ width: "6rem", height: "2.5rem" }}
//           >
//             Login
//           </Button>
//         </div>
//       </div>
//     </Form>
//   );
// };

// export default Loginpage;
