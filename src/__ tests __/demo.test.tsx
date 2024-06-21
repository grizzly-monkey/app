// import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormInstance } from 'antd';
import UserDetails from '@/pages/userManagement/userDetails';
import UserSelectors from '@/redux/user/selectors';


jest.mock("@/redux/user/actions",()=>({
    updateUserFirstName : jest.fn(),
    updateUserLastName : jest.fn(),
    updateUserRoles : jest.fn()
}))


jest.mock("react-redux",()=>({
    useDispatch:()=>jest.fn()
}))



describe('AddUserForm Component', () => {
    // beforeEach(()=>{
    //     UserSelectors.selectSelectedUser.mockReturnValue({ userId: '1', firstName: 'John', lastName: 'Doe', phone: '1234567890', role: 'Admin' })
    // })
    it('should render user details form with correct initial values', () => {
        const toggleField = jest.fn();
        const field = { firstName: false, lastName: false, roles: false };
        const form = { getFieldValue: jest.fn().mockReturnValue('') } as unknown as FormInstance;
        UserSelectors.selectSelectedUser = jest.fn().mockReturnValue({ userId: '1', firstName: 'John', lastName: 'Doe', phone: '1234567890', role: 'Admin' });
        const { getByText } = render(<UserDetails toggleField={toggleField} field={field} form={form} />);
    
        expect(getByText('First Name')).toBeInTheDocument();
        expect(getByText('John')).toBeInTheDocument();
        expect(getByText('Last Name')).toBeInTheDocument();
        expect(getByText('Doe')).toBeInTheDocument();
        expect(getByText('Contact Number')).toBeInTheDocument();
        expect(getByText('1234567890')).toBeInTheDocument();
        expect(getByText('Roles')).toBeInTheDocument();
        expect(getByText('Admin')).toBeInTheDocument();
    });
});
