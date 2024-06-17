import Button from "@/components/common/button";
import Form, { useForm } from "@/components/common/form";
import Input from "@/components/common/input";
import PhoneInput from "@/components/common/input/phoneInput";
import PasswordPolicyChecker, {
  checkPolicyStatus,
  getInitialPolicyStatus,
} from "@/components/common/passwordPolicyChecker";
import Tooltip from "@/components/common/tooltip";
import { passwordPolicy } from "@/config/consts";
import routePaths from "@/config/routePaths";
import { Images } from "@/utilities/imagesPath";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";

const iconStyle = {
  fontSize: 22,
  cursor: "pointer",
};

const ForgotPassword = () => {
  const [phoneInputForm] = useForm();
  const [newPasswordForm] = useForm();

  const [isOTPSent, setIsOTPSent] = useState(false);
  const [policiesStatus, setPolicyStatus] = useState(
    getInitialPolicyStatus(passwordPolicy)
  );
  const [isPasswordHintActive, setPasswordHintActive] = useState(false);
  const [password, setPassword] = useState("");

  const validatePassword = (value: string): Promise<void> => {
    const status = checkPolicyStatus(policiesStatus, password, passwordPolicy);
    const isPasswordValid = Object.values(status).every((val) => val);
    setPolicyStatus(status);
    return new Promise((resolve, reject) => {
      if (!value || value.length === 0 || isPasswordValid) {
        resolve();
      } else {
        reject(new Error("Password does not agree to the policy"));
      }
    });
  };

  function renderPasswordIcon() {
    return (visible: boolean) =>
      visible ? <IoEye style={iconStyle} /> : <IoEyeOff style={iconStyle} />;
  }

  const onPhoneInputFinish = (payload: any) => {
    console.log(payload);
    setIsOTPSent(true);
  };

  const onNewPasswordFinish = (payload: any) => {
    console.log(payload);
  };

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

          {!isOTPSent ? (
            <Form form={phoneInputForm} onFinish={onPhoneInputFinish}>
              <PhoneInput
                label="Phone number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              />

              <Button label="Reset Password" htmlType="submit" type="primary" />
            </Form>
          ) : (
            <Form form={newPasswordForm} onFinish={onNewPasswordFinish}>
              <Input
                label="OTP"
                name="otp"
                maxLength={6}
                rules={[
                  {
                    pattern: /^(?:\d*)$/,
                    message: "OTP should contain just number",
                  },
                ]}
                placeholder="Enter your OTP"
              />

              <Tooltip
                overlayInnerStyle={{ backgroundColor: "white", width: "250px" }}
                destroyTooltipOnHide={false}
                open={isPasswordHintActive}
                onOpenChange={setPasswordHintActive}
                title={
                  <PasswordPolicyChecker
                    password={password}
                    policy={passwordPolicy}
                  />
                }
                placement="right"
              >
                <Input
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    { validator: (_, value) => validatePassword(value) },
                  ]}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onFocus={() => {
                    setPasswordHintActive(true);
                  }}
                  onBlur={() => {
                    setPasswordHintActive(false);
                  }}
                  iconRender={renderPasswordIcon()}
                  isPasswordInput
                  placeholder="Enter your password"
                />
              </Tooltip>
              <Input
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Password don't match");
                    },
                  }),
                ]}
                iconRender={renderPasswordIcon()}
                isPasswordInput
                placeholder="Enter your confirm password"
              />

              <Button label="Reset Password" htmlType="submit" type="primary" />
            </Form>
          )}
          <Link to={routePaths.login}>
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
