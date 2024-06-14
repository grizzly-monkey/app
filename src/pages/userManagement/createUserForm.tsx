import Form from "@/components/ui/form";
import Input from "@/components/ui/input";
import PhoneInput from "@/components/ui/input/PhoneInput";
import Select from "@/components/ui/select";
import { Col, Row, Form as AntdForm } from "antd";

const roles =[
    {
        label:"Admin",
        value:"ADMIN"
    },
    {
        label:"Owner",
        value:"OWNER"
    
    },
    {
        lable:"Farm Manager",
        value:"FARM_MANAGER"
    },
    {
        label:"Agronomist",
        value:"ARGONOMIST"
    },
    {
        label:"Viewer",
        value:"VIEWER"
    }
]

const CreateUserForm = () => {
    return (
        <Form layout="vertical">
            <Row gutter={24}>
                <Col span={12}>
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
                </Col>
                <Col span={12}>
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
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <PhoneInput label="Contact Number"/>
                </Col>
                <Col span={12}>
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
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
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
                </Col>
                <Col span={12}>
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
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
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
                <Col span={12}>
                <Input
                        label="Orgnisation"
                        name="organisation"
                        rules={[
                            {
                                required: true,
                                message: "Please input your organisation!",
                            },
                        ]}
                        placeholder="Enter your organisation"
                    />
                   {/* <AntdForm.Item
                    label="Organisation"
                    name="organisation"
                    rules={[
                        {
                            required: true,
                            message: "Please select roles",
                        },
                    ]}
                    >
                          <Select placeholder="Select Role" options={roles} mode="multiple" />
                   </AntdForm.Item> */}
                </Col>
            </Row>
        </Form>
    )
}

export default CreateUserForm;