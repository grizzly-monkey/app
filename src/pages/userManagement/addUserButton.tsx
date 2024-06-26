import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import { Col, Row, Form as AntdForm } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserActions from "@/redux/user/actions";
import { roles } from "./utils";
import { CreateUser } from "./types";
import requestingSelector from "@/redux/requesting/requestingSelector";
import Button from "@/components/common/button";
import Form from "@/components/common/form";
import Input from "@/components/common/input";
import PhoneInput from "@/components/common/input/phoneInput";
import { getTranslation } from "@/translation/i18n";

const AddUserButton = () => {
  const [prevLoading, setPrevLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = AntdForm.useForm();
  const loading = useSelector((state) =>
    requestingSelector(state, [UserActions.CREATE_USER], "")
  );
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values: CreateUser) => {
        values.address = "address";
        values.email = "abc@gmail.com";
        values.phone = `+${values.phone}`;
        values.password = "Qwerty@123";
        values.role = "ADMIN";
        values.organisationName = "organisationName";
        dispatch(UserActions.createUser(values));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!loading && prevLoading) {
      handleCancel();
    }
    setPrevLoading(loading);
  }, [loading]);

  return (
    <>
      <Button
        label={getTranslation("userManagement.addUser")}
        style={{ padding: "0 0" }}
        onClick={showModal}
      />
      <Modal
        data-testid="add-user-modal"
        destroyOnClose={true}
        style={{ padding: "20px 30px" }}
        title={getTranslation("userManagement.addUser")}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        confirmLoading={loading}
        okText={getTranslation("global.add")}
        onClose={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Row gutter={24}>
            <Col span={24}>
              <Input
                label={getTranslation("global.firstName")}
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: getTranslation(
                      "userManagement.addUserModal.firstNameError"
                    ),
                  },
                ]}
                placeholder={getTranslation(
                  "userManagement.addUserModal.firstNamePlaceholder"
                )}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Input
                label={getTranslation("global.lastName")}
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: getTranslation(
                      "userManagement.addUserModal.lastNameError"
                    ),
                  },
                ]}
                placeholder={getTranslation(
                  "userManagement.addUserModal.lastNamePlaceholder"
                )}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <PhoneInput
                label={getTranslation("global.contactNumber")}
                name="phone"
                rules={[
                  {
                    required: true,
                    message: getTranslation(
                      "userManagement.addUserModal.phoneError"
                    ),
                  },
                ]}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <AntdForm.Item
                label={getTranslation("global.roles")}
                name="roles"
                rules={[
                  {
                    required: true,
                    message: getTranslation(
                      "userManagement.addUserModal.rolesError"
                    ),
                  },
                ]}
              >
                <Select
                  placeholder={getTranslation(
                    "userManagement.addUserModal.rolesPlaceholder"
                  )}
                  options={roles}
                  mode="multiple"
                />
              </AntdForm.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddUserButton;
