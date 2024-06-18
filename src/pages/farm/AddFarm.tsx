import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import { Col, Row, Form as AntdForm } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserActions from "@/redux/user/actions";
// import { roles } from "./utils";
import { CreateUser } from "./types";
import requestingSelector from "@/redux/requesting/requestingSelector";
import Button from "@/components/common/button";
import Form from "@/components/common/form";
import Input from "@/components/common/input";
import PhoneInput from "@/components/common/input/phoneInput";

const AddFarmButton = () => {
    const [prevLoading, setPrevLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = AntdForm.useForm();
    const loading = useSelector((state) =>
        requestingSelector(state, [UserActions.CREATE_USER], ""),
    )
    const dispatch = useDispatch();
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then((values: CreateUser) => {
            values.address="address"
            values.email="abc@gmail.com"
            values.phone= `+${values.phone}`
            values.password="Qwerty@123"
            values.role="ADMIN"
            values.organisationName="organisationName"
            dispatch(UserActions.createUser(values))
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
            <Button label="Add farm" onClick={showModal} style={{ padding: "0 0" }} />
            <Modal
                style={{ padding: "20px 30px" }}
                title="Add User"
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleOk}
                confirmLoading={loading}
                okText="Add"
                onClose={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Row gutter={24}>
                        <Col span={24}>
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
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={24}>
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
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={24}>
                            <PhoneInput label="Contact Number" name="phone" />
                        </Col>
                    </Row>
                    {/* <Row gutter={24}>
                        <Col span={24}>
                            <AntdForm.Item
                                label="Roles"
                                name="roles"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select roles",
                                    },
                                ]}
                            >
                                <Select placeholder="Select Role" options={roles} mode="multiple" />
                            </AntdForm.Item>
                        </Col>
                    </Row> */}
                </Form>
            </Modal>
        </>
    )
}

export default AddFarmButton;