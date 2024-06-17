import Button from "@/components/common/button";
import Form from "@/components/common/form";
// import Input from "@/components/ui/input";
import PhoneInput from "@/components/common/input/phoneInput";
import routePaths from "@/config/routePaths";
import { Images } from "@/utilities/imagesPath";
// import { Form } from "antd";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="login_container">
      <div className="form_main_container">
        <div className="form_container">
          <div className="form_header_container">
            <div className="logo_container">
              <img src={Images.LOGO} />
            </div>
            <div className="form_header_content">
              <p className="heading1">Forgot Password?</p>
              <p className="description">
                Please enter your phone number to reset the password
              </p>
            </div>
          </div>

          <Form
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          >
            <PhoneInput />

            <Button label="Reset Password" onClick={() => {}} type="primary" />
          </Form>

          {/* <Form
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            layout="vertical"
            className="row-col"
          >
            <Input
              label="OTP"
              name="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your OTP!",
                },
              ]}
              placeholder="Enter your OTP"
            />
            <Input
              label="Password"
              name="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              placeholder="Enter your password"
            />
            <Input
              label="Confirm Password"
              name="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              placeholder="Enter your confirm password"
            />

            <Button label="Reset Password" onClick={() => {}} type="primary" />
          </Form> */}

          <Link to={routePaths.signUp}>
            <p className="not_a_memeber_text">
              Back to <span className="register_text">Login</span>
            </p>
          </Link>
        </div>
      </div>
      <div className="image_main_container">
        <div className="image_container">
          <img
            alt="not found"
            src="https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
