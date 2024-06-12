import Button from "@/components/ui/button";
import "../style.scss";
import { Images } from "@/utilities/imagesPath";
import Input from "@/components/ui/input";
import Checkbox from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import routePaths from "@/config/routePaths";
import PhoneInput from "@/components/ui/input/PhoneInput";
import Form from "@/components/ui/form";

const Login = () => {
  return (
    <div className="login_container">
      <div className="form_main_container">
        <div className="form_container">
          <div className="form_header_container">
            <div className="logo_container">
              <img src={Images.LOGO} />
            </div>
            <div className="form_header_content">
              <p className="heading1">Welcome Back!</p>
              <p className="description">Please Sign in to continue</p>
            </div>
          </div>

          <Form
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            layout="vertical"
            className="row-col"
          >
            <PhoneInput
              label="Phone number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
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

            <div className="forget_password_container">
              <Checkbox label="Remember me" />
              <Link to={routePaths.forgotPassword}>
                <p className="heading4 forget_password_text">
                  Forgot password?
                </p>
              </Link>
            </div>
            <Button
              htmlType="submit"
              label="Sign in"
              onClick={() => {}}
              type="primary"
            />
          </Form>

          <Link to={routePaths.signUp}>
            <p className="not_a_memeber_text">
              Don't have an account?{" "}
              <span className="register_text">Sign Up</span>
            </p>
          </Link>
        </div>
      </div>
      <div className="image_main_container">
        <div className="image_container">
          <img
            alt="not found"
            src="https://images.unsplash.com/photo-1518994603110-1912b3272afd?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
