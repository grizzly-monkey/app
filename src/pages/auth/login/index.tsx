import Button from "@/components/common/button";
import Checkbox from "@/components/common/checkbox";
import AlertError from "@/components/common/error/AlertError";
import Form, { useForm } from "@/components/common/form";
import Input from "@/components/common/input";
import PhoneInput from "@/components/common/input/phoneInput";
import routePaths from "@/config/routePaths";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { removeByActionType } from "@/redux/error/errorAction";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import { makeRequestingSelector } from "@/redux/requesting/requestingSelector";
import SessionActions from "@/redux/session/actions";
import SessionSelectors from "@/redux/session/selectors";
import { getTranslation } from "@/translation/i18n";
import { loginType } from "@/types/auth";
import { Images } from "@/utilities/imagesPath";
import { errorToast } from "@/utilities/toast";
import { useEffect } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";
import "../style.scss";

const selectLoading = makeRequestingSelector();
const selectError = makeSelectErrorModel();

const iconStyle = {
  fontSize: 22,
  cursor: "pointer",
};

const Login = () => {
  const [form] = useForm();
  const dispatch = useAppDispatch();

  const error = useAppSelector((state) =>
    selectError(state, SessionActions.REQUEST_LOGIN_FINISHED)
  );
  const loading = useAppSelector((state) =>
    selectLoading(state, [SessionActions.REQUEST_LOGIN])
  );
  const accountApprovalStatus = useAppSelector(
    SessionSelectors.SelectAccountApprovalStatus
  );

  const onFinish = (payload: loginType) => {
    dispatch(SessionActions.login(payload));
  };

  const clearError = () => {
    dispatch(removeByActionType(SessionActions.REQUEST_LOGIN_FINISHED));
  };

  function renderPasswordIcon() {
    return (visible: boolean) =>
      visible ? <IoEye style={iconStyle} /> : <IoEyeOff style={iconStyle} />;
  }

  useEffect(() => {
    if (error) {
      errorToast(error.errors.map((item: any) => item.message)[0]);
      clearError();
    }
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch(SessionActions.setAccountApprovalStatus(""));
    };
  }, []);

  return (
    <div className="login_container">
      <div className="form_main_container">
        <div className="form_container">
          <div className="form_header_container">
            <div className="logo_container">
              <img src={Images.LOGO} />
            </div>
            <div className="form_header_content">
              <p className="heading1">{getTranslation("login.welcomeBack")}</p>
              <p className="description">
                {getTranslation("login.pleaseSignToContinue")}
              </p>
            </div>
          </div>

          {accountApprovalStatus && (
            <AlertError message={accountApprovalStatus} />
          )}

          <Form form={form} onFinish={onFinish} layout="vertical">
            <PhoneInput
              label={getTranslation("global.phoneNumber")}
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: getTranslation("global.phoneNumberErrMsg"),
                },
              ]}
            />
            <Input
              label={getTranslation("global.password")}
              name="password"
              rules={[
                {
                  required: true,
                  message: getTranslation("global.passwordErrMsg"),
                },
              ]}
              iconRender={renderPasswordIcon()}
              isPasswordInput
              placeholder={getTranslation("global.passwordPlaceholder")}
              testId="password-input"
            />

            <div className="forget_password_container">
              <Checkbox label={getTranslation("login.rememberMe")} />
              <Link to={routePaths.forgotPassword}>
                <p className="heading4 forget_password_text">
                  {getTranslation("global.forgotPassword")}
                </p>
              </Link>
            </div>

            <Button
              loading={loading}
              htmlType="submit"
              label={getTranslation("global.signIn")}
              type="primary"
            />
          </Form>

          <Link to={routePaths.signUp}>
            <p className="not_a_memeber_text">
              {getTranslation("login.dontHaveAnAccount")}{" "}
              <span className="register_text">
                {getTranslation("global.signUp")}
              </span>
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
