import UserActions from "@/redux/user/actions";
import UserSelectors from "@/redux/user/selectors";
import { Drawer } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(UserSelectors.selectSelectedUser)
    useEffect(() => {
        if (user) {
            setIsSidebarOpen(true)
        }
    }, [user])

    const onClose = () => {
        setIsSidebarOpen(false)
        dispatch(UserActions.unSelectUser())
    }

    return (
        <Drawer title="User Details" open={isSidebarOpen} onClose={onClose} getContainer={false}>
            <table style={{width:'100%'}}>
                <tr style={{height:'50px'}}>
                    <td>
                        <strong>
                            First Name
                        </strong>
                    </td>
                    <td>{user?.firstName}</td>
                </tr>
                <tr style={{height:'50px'}}>
                    <td><strong>
                        Last Name
                    </strong></td>
                    <td>{user?.lastName}</td>
                </tr>
                <tr style={{height:'50px'}}>
                   <td>
                          <strong>
                            Contact Number
                          </strong>
                   </td>
                    <td>{user?.contactNumber}</td>
                </tr>
                <tr style={{height:'50px'}}>
                    <td>
                        <strong>
                            Roles
                        </strong>
                    </td>
                    <td>{user?.roles.join(',')}</td>
                </tr>
            </table>
        </Drawer>
    );
}

export default Sidebar;