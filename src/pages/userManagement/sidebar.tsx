import SideBar from "@/components/ui/sidebar";
import UserSelectors from "@/redux/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { Divider } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import UserActions from "@/redux/user/actions";
const UserSidebar = () => {
    const selectedUser = useSelector(UserSelectors.selectSelectedUser)
    const dispatch = useDispatch();
    const closeSidebar = () => {
        dispatch(UserActions.unSelectUser())
    }

    return (
        <SideBar isOpen={!!selectedUser} >
            <div style={{padding:'20px 20px', width:'100%'}}>
                <div style={{display:'flex', justifyContent:'space-between',textAlign:'center'}}>
                    <h5 style={{ fontSize: '130%' }}>
                        <strong> User Details</strong>
                    </h5>
                    <CloseOutlined style={{cursor:'pointer', padding:'5px 5px'}}  onClick={closeSidebar}/>
                </div>
                <Divider />
                <div className="user-details-sidebar" style={{width:'100%'}}>
                    <table>
                        <tbody>
                            <tr >
                                <td>
                                    <strong>
                                        First Name
                                    </strong>
                                </td>
                                <td>{selectedUser?.firstName}</td>
                            </tr>
                            <tr>
                                <td><strong>
                                    Last Name
                                </strong></td>
                                <td>{selectedUser?.lastName}</td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>
                                        Contact Number
                                    </strong>
                                </td>
                                <td>{selectedUser?.contactNumber}</td>
                            </tr>
                            <tr >
                                <td>
                                    <strong>
                                        Roles
                                    </strong>
                                </td>
                                <td>{selectedUser?.roles.join(',')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </SideBar>
    );
}

export default UserSidebar;