import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import PhoneInput from "@/components/ui/input/PhoneInput";
import routePaths from "@/config/routePaths";
import { Images } from "@/utilities/imagesPath";
import { Form } from "antd";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="signUp_container">
      <div className="form_main_container">
        <div className="form_container signUp_form_container">
          <div className="form_header_container">
            <div className="logo_container">
              <img src={Images.LOGO} />
            </div>
            <div className="form_header_content">
              <p className="heading1">Create Your Account</p>
              <p className="description">
                Fill in the details blow to register your absolutely free
                account.
              </p>
            </div>
          </div>

          <Form
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <div className="input_row">
              <Input
                label="First name"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name",
                  },
                ]}
                placeholder="Enter your first name"
              />
              <Input
                label="Last name"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
                placeholder="Enter your last name"
              />

              <PhoneInput />

              <Input
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
                placeholder="Enter your email"
              />

              <Input
                label="Password"
                name="email"
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
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm password!",
                  },
                ]}
                placeholder="Enter your confirm password"
              />
            </div>

            <Input
              label="Organisation name"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your organisation name!",
                },
              ]}
              placeholder="Enter your organisation name"
            />
            <Input
              label="Address"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
              placeholder="Enter your address"
            />

            <Button label="Sign up" onClick={() => {}} type="primary" />
          </Form>

          <Link to={routePaths.login}>
            <p className="not_a_memeber_text">
              Already have an account?{" "}
              <span className="register_text">Sign In</span>
            </p>
          </Link>
        </div>
      </div>
      <div className="image_main_container">
        <div className="image_container">
          <img
            alt="not found"
            src="https://images.unsplash.com/photo-1535379453347-1ffd615e2e08?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
