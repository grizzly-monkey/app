import Form, { useForm } from "@/components/common/form";
import Input from "@/components/common/input";
import { getTranslation } from "@/translation/i18n";
import { Card } from "antd";
import Button from "@/components/common/button";
import "./style.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import SessionSelectors from "@/redux/session/selectors";
import { useEffect } from "react";
import SessionActions from "@/redux/session/actions";
import { userPayload } from "./types";
import { makeRequestingSelector } from "@/redux/requesting/requestingSelector";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import AlertError from "@/components/common/error/AlertError";

const selectLoading = makeRequestingSelector();
const selectError = makeSelectErrorModel();

const Profile = () => {
  const [form] = useForm();
  const dispatch = useAppDispatch();

  const userDetails = useAppSelector(SessionSelectors.SelectUserDetails);
  const loading = useAppSelector((state) =>
    selectLoading(state, [SessionActions.UPDATE_USER_DETAILS])
  );
  const error = useAppSelector((state) =>
    selectError(state, SessionActions.UPDATE_USER_DETAILS_FINISHED)
  );

  const handleSetData = () => {
    form.setFieldValue("firstName", userDetails.given_name);
    form.setFieldValue("lastName", userDetails.family_name);
    form.setFieldValue("email", userDetails.email);
    form.setFieldValue("phoneNumber", userDetails.phone_number);
    form.setFieldValue("address", userDetails.address?.formatted);
  };

  const handleSubmit = (values: userPayload) => {
    const payload = [
      {
        Name: "given_name",
        Value: values.firstName,
      },
      {
        Name: "family_name",
        Value: values.lastName,
      },
      {
        Name: "email",
        Value: values.email,
      },
      {
        Name: "address",
        Value: values.address,
      },
    ];

    dispatch(SessionActions.updateUserDetails(payload));
  };

  useEffect(() => {
    handleSetData();
  }, []);

  return (
    <Card bordered={false} style={{ margin: "20px" }}>
      <AlertError error={error} />
      <Form form={form} onFinish={handleSubmit}>
        <div className="form_input_container">
          <Input
            label={getTranslation("global.firstName")}
            name="firstName"
            testId="first-name"
            rules={[
              {
                required: true,
                message: getTranslation("global.firstNameErrMsg"),
              },
            ]}
            placeholder={getTranslation("global.firstNamePlaceholder")}
          />
          <Input
            label={getTranslation("global.lastName")}
            name="lastName"
            testId="last-name"
            rules={[
              {
                required: true,
                message: getTranslation("global.lastNameErrMsg"),
              },
            ]}
            placeholder={getTranslation("global.lastNamePlaceholder")}
          />
          <Input
            label={getTranslation("global.email")}
            name="email"
            testId="email"
            rules={[
              {
                required: true,
                message: getTranslation("global.emailErrMsg"),
              },
            ]}
            placeholder={getTranslation("global.emailPlaceholder")}
          />
          <Input
            disabled
            testId="phone-number"
            name="phoneNumber"
            label={getTranslation("global.phoneNumber")}
          />
        </div>
        <Input
          label={getTranslation("global.address")}
          name="address"
          testId="address"
          rules={[
            {
              required: true,
              message: getTranslation("global.addressErrMsg"),
            },
          ]}
          placeholder={getTranslation("global.addressPlaceholder")}
        />

        <Button
          className="submit_btn"
          loading={loading}
          htmlType="submit"
          label={getTranslation("global.update")}
          type="primary"
        />
      </Form>
    </Card>
  );
};

export default Profile;
