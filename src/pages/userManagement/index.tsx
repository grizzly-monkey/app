import { Input, Flex } from "antd";
import Table from "../../components/ui/table";
import Card from "@/components/ui/card";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import UserSelectors from "@/redux/user/selectors";
import AddUserButton from "./addUserButton";
import { useEffect, useState } from "react";
import UserActions from "@/redux/user/actions";
<<<<<<< Updated upstream
import Sidebar from "./sidebar";
import { use } from "i18next";
=======
import UserSidebar from "./sidebar";
import columns from "./columns";
import { User } from "./types";

>>>>>>> Stashed changes

const { Search } = Input;

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

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const filteredData = users.filter((user:User) => {
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
<<<<<<< Updated upstream
        <div style={{position:'relative', height:'calc( 100vh - 85px)'}}>
            <Sidebar />
=======
        <div style={{height:'100%',display:'flex'}}>
>>>>>>> Stashed changes
            <Card
                style={{ width: !selectedUser ? '100%' : 'calc( 100% - 350px)', height:'fit-content' ,paddingTop:'20px'}}
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
                    />
                </div>
            </Card>
            <UserSidebar />
        </div>
    )
}

export default UserManagement;