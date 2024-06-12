import { Card, TableProps, Avatar, Typography, Tag, Form, Row, Col, Select, Input, Flex } from "antd";
import Table from "../../components/ui/table";
import Button from "@/components/ui/button";
import "./style.scss";
import Modal from "@/components/ui/modal";
import { useState } from "react";
import { Option } from "antd/es/mentions";

const { Search } = Input;
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
interface User {
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    contactNumber: string;
}
const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="91">+91</Option>
            <Option value="87">+87</Option>
        </Select>
    </Form.Item>
);
const columns: TableProps<User>['columns'] = [
    {
        title: 'Name',
        dataIndex: 'Name',
        render: (_, record) => {
            const backgroundColor = ColorList[Math.floor(Math.random() * ColorList.length)];
            return <>
                <Avatar shape="square" style={{ backgroundColor: backgroundColor, verticalAlign: 'middle' }}>
                    {`${record.firstName[0]}${record.lastName[0]}`}
                </Avatar>
                <Typography.Text style={{ marginLeft: "10px" }}>
                    {`${record.firstName} ${record.lastName}`}
                </Typography.Text>
            </>
        },
        sorter: (a, b) => a.firstName.length - b.firstName.length,
        key: '1',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: '2',
    },

    {
        title: 'Contact',
        dataIndex: 'contactNumber',
        key: '3',
    },
    {
        title: 'Roles',
        dataIndex: 'roles',
        render: (roles) => <>
            {roles.map((role: string) => {
                let color 
                switch (role) {
                    case 'Admin':
                        color = 'red';
                        break;
                    case 'User':
                        color = 'green';
                        break;
                    default:
                        color = 'blue';
                        break;
                }
                return <Tag color={color} key={role}>
                    {role}
                </Tag>
            }

            )}
        </>,
        key: '4',
    },


]

const data: User[] = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'one@gmail.com',
        roles: ['Admin','User'],
        contactNumber: '1234567890',
    },
    {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'two@gamil.com',
        roles: ['User'],
        contactNumber: '0987654321',
    },
    {
        firstName: 'John',
        lastName: 'Smith',
        email: 'thre@gmail.com',
        roles: ['Admin'],
        contactNumber: '1234567890',
    }
]
const UserManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div >
            <Card
                style={{ width: "100%" }}
                bordered={false}
                title="Users"
                className="criclebox tablespace"
                extra={
                    <Flex gap={20}>
                        <Search placeholder="input search text" style={{ width: '200%' }} />
                        <Button label="Add User" style={{ padding: "0 0" }} onClick={showModal} />
                    </Flex>


                }
            >
                <div className="table-responsive">
                    <Table columns={columns} dataSource={data} className="ant-border-space" />
                </div>

            </Card>
            <Modal
                title="Add User"
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleOk}
                width={800}
            >
                <Form layout="vertical">
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="First Name">
                                <Input placeholder="first name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Last Name">
                                <Input placeholder="last name" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="Phone Number"
                                rules={[{ required: true, message: 'Please input your phone number!' }]}
                            >
                                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Email">
                                <Input placeholder="email" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your password!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder="password" />
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Modal>

        </div>
    )
}

export default UserManagement;