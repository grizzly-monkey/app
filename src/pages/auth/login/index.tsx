import { useEffect } from "react";
import "../style.scss";
import Button from "@/components/common/button";
import { Images } from "@/utilities/imagesPath";
import Input from "@/components/common/input";
import Checkbox from "@/components/common/checkbox";
import { Link } from "react-router-dom";
import routePaths from "@/config/routePaths";
import PhoneInput from "@/components/common/input/phoneInput";
import Form, { useForm } from "@/components/common/form";
import { useDispatch } from "react-redux";
import SessionActions from "@/redux/session/actions";
import { loginType } from "@/types/auth";
import { useAppSelector } from "@/hooks/redux";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import { removeByActionType } from "@/redux/error/errorAction";
import { errorToast } from "@/utilities/toast";
import { makeRequestingSelector } from "@/redux/requesting/requestingSelector";

const selectLoading = makeRequestingSelector();
const selectError = makeSelectErrorModel();

const Login = () => {
  const [form] = useForm();
  const dispatch = useDispatch();

  const error = useAppSelector((state) =>
    selectError(state, SessionActions.REQUEST_LOGIN_FINISHED)
  );
  const loading = useAppSelector((state) =>
    selectLoading(state, [SessionActions.REQUEST_LOGIN])
  );

  const onFinish = (payload: loginType) => {
    dispatch(SessionActions.login(payload));
  };

  const clearError = () => {
    dispatch(removeByActionType(SessionActions.REQUEST_LOGIN_FINISHED));
  };

  useEffect(() => {
    if (error) {
      errorToast(error.errors.map((item: any) => item.message));
      clearError();
    }
  }, [error]);

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

          <Form form={form} onFinish={onFinish} layout="vertical">
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

            <Input
              label="Password"
              name="password"
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
              loading={loading}
              htmlType="submit"
              label="Sign in"
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
