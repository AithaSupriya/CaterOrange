import React from "react";
import { Form, Input, Button } from "antd";
// import "../styles/SignupScreen.css";
import '../styles/SignupScreen.css';
import '../styles/Navbar.css';

const SignupPage = ({ openLogin }) => {
  const redirectToPage = () => {
    window.location.href = "/";
  };

  const onFinish = async (values) => {
    const { email, password, phoneNumber } = values;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, phoneNumber }),
        }
      );

      if (response.ok) {
        console.log("Signup successful");
        window.location.href = "/"; // Redirect to home page after successful signup
      } else {
        const errorMessage = await response.text();
        console.error(`Signup failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <Form onFinish={onFinish}>
      <div className="main-outer">
        <div className="main-outer-div">
          <div className="signup-main">
            <Form.Item
              name="email"
              label="E-mail"
              style={{ textAlign: "left", 
               }}
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
              <Input className="input-field" placeholder="Enter Your Email"  />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              style={{ textAlign: "left" }}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
              className="input-field"
                placeholder="Enter Your Password"
                
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              style={{ textAlign: "left" }}
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
              className="input-field"
                placeholder="Enter Your Password again"
                
              />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              style={{ textAlign: "left" }}
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input className="input-field" placeholder="Enter Your Phone Number"  />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
            <span style={{ color: "purple" }}>
              <img src="" alt=""></img>Back to Login Page{" "}
              <Button style={{ height: "2rem" }} onClick={openLogin}>
                Click here
              </Button>
            </span>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SignupPage;




// import React from "react";
// import { Form, Input, Button } from "antd";
// import "../styles/SignupScreen.css";

// const SignupPage = () => {
//   const redirectToPage = () => {
//     window.location.href = "/";
//   };


//   const onFinish = async (values) => {
//     const { email, password, phoneNumber } = values;

//     try {
//       const response = await fetch(${process.env.REACT_APP_BACKEND_URL}/api/signup, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password, phoneNumber }),
//       });

//       if (response.ok) {
//         console.log("Signup successful");
//         window.location.href = "/"; // Redirect to home page after successful signup
//       } else {
//         const errorMessage = await response.text();
//         console.error(Signup failed: ${errorMessage});
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//     }
//   };

//   return (
//     <Form onFinish={onFinish}>
//       <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50rem'}}>
//         <div className="main-outer-div">
//           <div className="signup-main">
//             <Form.Item
//               name="email"
//               label="E-mail"
//               style={{ textAlign: "left" }}
//               rules={[
//                 {
//                   type: "email",
//                   message: "The input is not valid E-mail!",
//                 },
//                 {
//                   required: true,
//                   message: "Please input your E-mail!",
//                 },
//               ]}
//             >
//               <Input placeholder="Enter Your Email" style={{ height: "3rem" }} />
//             </Form.Item>
//             <Form.Item
//               name="password"
//               label="Password"
//               style={{ textAlign: "left" }}
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your password!",
//                 },
//               ]}
//               hasFeedback
//             >
//               <Input.Password
//                 placeholder="Enter Your Password"
//                 style={{ height: "3rem" }}
//               />
//             </Form.Item>
//             <Form.Item
//               name="confirm"
//               label="Confirm Password"
//               style={{ textAlign: "left" }}
//               dependencies={["password"]}
//               hasFeedback
//               rules={[
//                 {
//                   required: true,
//                   message: "Please confirm your password!",
//                 },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (!value || getFieldValue("password") === value) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(
//                       new Error("The new password that you entered do not match!")
//                     );
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password
//                 placeholder="Enter Your Password again"
//                 style={{ height: "3rem" }}
//               />
//             </Form.Item>
//             <Form.Item
//               name="phoneNumber"
//               label="Phone Number"
//               style={{ textAlign: "left" }}
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your phone number!",
//                 },
//               ]}
//             >
//               <Input placeholder="Enter Your Phone Number" style={{ height: "3rem" }} />
//             </Form.Item>
//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 Sign Up
//               </Button>
//             </Form.Item>
//             <span style={{ color: "purple" }}>
//               <img src="" alt=""></img>Back to Login Page{" "}
//               <Button style={{ height: "2rem" }} onClick={redirectToPage}>
//                 Click here
//               </Button>
//             </span>
//           </div>
//         </div>
//       </div>
//     </Form>
//   );
// };

// export default SignupPage;