import Form from "@/components/ui/form";
import Input from "@/components/ui/input";
import PhoneInput from "@/components/ui/input/PhoneInput";
import Modal from "@/components/ui/modal";
import Button from "@/components/ui/button";
import Select from "@/components/ui/select";
import { Col, Row, Form as AntdForm } from "antd";
import { useState } from "react";

const roles = [
    {
        label: "Admin",
        value: "ADMIN"
    },
    {
        label: "Owner",
        value: "OWNER"

    },
    {
        lable: "Farm Manager",
        value: "FARM_MANAGER"
    },
    {
        label: "Agronomist",
        value: "ARGONOMIST"
    },
    {
        label: "Viewer",
        value: "VIEWER"
    }
]


const AddUserButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = AntdForm.useForm();
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then((values:any) => {
            console.log("fieldsd",values);
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button label="Add User" style={{ padding: "0 0" }} onClick={showModal} />
            <Modal
                style={{ padding: "20px 30px" }}
                title="Add User"
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleOk}
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
                            <PhoneInput label="Contact Number" name="phone"/>
                        </Col>
                    </Row>
                    <Row gutter={24}>
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
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default AddUserButton;