import Button from "@/components/common/button";
import AlertError from "@/components/common/error/AlertError";
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
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import AccountActions from "@/redux/account/actions";
import { removeByActionType } from "@/redux/error/errorAction";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import { makeRequestingSelector } from "@/redux/requesting/requestingSelector";
import { registerType } from "@/types/auth";
import { getKeyForAction } from "@/utilities/actionUtility";
import { Images } from "@/utilities/imagesPath";
import { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";

const selectLoading = makeRequestingSelector();
const selectError = makeSelectErrorModel();

const iconStyle = {
  fontSize: 22,
  cursor: "pointer",
};

const SignUp = () => {
  const [form] = useForm();
  const dispatch = useAppDispatch();

  const [policiesStatus, setPolicyStatus] = useState(
    getInitialPolicyStatus(passwordPolicy)
  );
  const [isPasswordHintActive, setPasswordHintActive] = useState(false);
  const [password, setPassword] = useState("");

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

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(removeByActionType(getKeyForAction(error?.actionType)));
      }
    };
  }, []);

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
