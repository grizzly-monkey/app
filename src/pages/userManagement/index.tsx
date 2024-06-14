import { Card, TableProps, Avatar, Typography, Tag, Input, Flex } from "antd";
import Table from "../../components/ui/table";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import UserSelectors from "@/redux/user/selectors";
import AddUserButton from "./addUserButton";
import { useEffect } from "react";
import UserActions from "@/redux/user/actions";

const { Search } = Input;
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
interface User {
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    contactNumber: string;
}

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
    const dispatch = useDispatch()
    const users = useSelector(UserSelectors.selectUsers)

    useEffect(() => {
        dispatch(UserActions.fetchUsers())
    }, [])
    
    return (
        <div >
            <Card
                style={{ width: "100%" }}
                bordered={false}
                title="Users"
                className="criclebox tablespace"
                extra={
                    <Flex gap={20}>
                        <Search placeholder="input search text"  style={{ width: '200%', height:'32px'}} />
                        <AddUserButton/>
                    </Flex>


                }
            >
                <div className="table-responsive">
                    <Table columns={columns} dataSource={data} className="ant-border-space" />
                </div>
            </Card>
        </div>
    )
}

export default UserManagement;