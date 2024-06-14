import { Card, TableProps, Avatar, Typography, Tag, Input, Flex } from "antd";
import Table from "../../components/ui/table";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import UserSelectors from "@/redux/user/selectors";
import AddUserButton from "./addUserButton";
import { useEffect, useState } from "react";
import UserActions from "@/redux/user/actions";
import Sidebar from "./sidebar";
import { use } from "i18next";

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
    // {
    //     title: 'Email',
    //     dataIndex: 'email',
    //     key: '2',
    // },

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


const UserManagement = () => {
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])
    const dispatch = useDispatch()
    const users = useSelector(UserSelectors.selectUsers)
    const selectedUser = useSelector(UserSelectors.selectSelectedUser)
    const onRow = (record: User) => {
        return {
            onClick: () => {
                dispatch(UserActions.selectUser(record))
            }
        }
    
    }

    const onSearch = (e: any) => {
        const value = e.target.value;
        const filteredData = users.filter((user:any) => {
            return user.firstName.toLowerCase().includes(value.toLowerCase()) || user.lastName.toLowerCase().includes(value.toLowerCase())
        })
        setFilteredUsers(filteredData)

    }

    useEffect(() => {
        dispatch(UserActions.fetchUsers())
    }, [])
    
    useEffect(() => {
        setFilteredUsers(users)
    }, [users])

    return (
        <div style={{position:'relative', height:'90vh'}}>
            <Sidebar />
            <Card
                style={{ width: !selectedUser ? '100%' : 'calc( 100% - 378px)' }}
                bordered={false}
                title="Users"
                className="criclebox tablespace"
                extra={
                    <Flex gap={20}>
                        <Search placeholder="input search text"  style={{ width: '200%', height:'32px'}} onChange={onSearch}/>
                        <AddUserButton/>
                    </Flex>
                }
            >
                <div className="table-responsive">
                    <Table columns={columns} dataSource={filteredUsers} className="ant-border-space" onRow={onRow}
                    //  style={{ width: !selectedUser ? '100%' : 'calc( 100% - 378px)' }}
                    />
                </div>
            </Card>
        </div>
    )
}

export default UserManagement;