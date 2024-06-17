import Button from "@/components/common/button";
import AlertError from "@/components/common/error/AlertError";
import FullAlertError from "@/components/common/error/FullAlertError";
import Form, { useForm } from "@/components/common/form";
import Input from "@/components/common/input";
import PhoneInput from "@/components/common/input/phoneInput";
import routePaths from "@/config/routePaths";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import AccountActions from "@/redux/account/actions";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import { makeRequestingSelector } from "@/redux/requesting/requestingSelector";
import { registerType } from "@/types/auth";
import { Images } from "@/utilities/imagesPath";
import { REGEX } from "@/utilities/regex";
import { Link } from "react-router-dom";

const selectLoading = makeRequestingSelector();
const selectError = makeSelectErrorModel();

const SignUp = () => {
  const [form] = useForm();
  const dispatch = useAppDispatch();

  const error = useAppSelector((state) =>
    selectError(state, AccountActions.REQUEST_REGISTER_FINISHED)
  );
  const loading = useAppSelector((state) =>
    selectLoading(state, [AccountActions.REQUEST_REGISTER])
  );

  const onFinish = (values: registerType) => {
    const payload = { ...values };
    payload.phone = `+${payload.phone}`;
    delete payload.confirmPassword;

    dispatch(AccountActions.register(payload));
  };

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

          <FullAlertError error={error} />

          <AlertError error={error} />

          <Form form={form} onFinish={onFinish} layout="vertical">
            <div className="input_row">
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
                label="Organisation name"
                name="organisationName"
                rules={[
                  {
                    required: true,
                    message: "Please input your organisation name!",
                  },
                ]}
                placeholder="Enter your organisation name"
              />

              <Input
                label="First name"
                name="firstName"
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
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
                placeholder="Enter your last name"
              />

              <Input
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    pattern: REGEX.PASSWORD_VALIDATION,
                    message:
                      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                  },
                ]}
                placeholder="Enter your password"
              />
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
                placeholder="Enter your confirm password"
              />
            </div>

            <Button
              loading={loading}
              htmlType="submit"
              label="Sign up"
              type="primary"
            />
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
