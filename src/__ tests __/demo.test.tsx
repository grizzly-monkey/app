// import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '@/pages/auth/login';
// import { Provider } from 'react-redux';
// import { store } from '@/redux/store';

describe('AddUserForm Component', () => {
    test('renders the form correctly', () => {
        render(
           
                <Login />
           
            );
            expect(screen.getByTestId('first-name-input')).toBeInTheDocument()
    });

    //   test('input fields accept text', () => {
    //     render(<AddUserForm />);
    //     const firstNameInput = screen.getByLabelText(/First Name/i);
    //     const lastNameInput = screen.getByLabelText(/Last Name/i);
    //     const contactNumberInput = screen.getByLabelText(/Contact Number/i);

    //     fireEvent.change(firstNameInput, { target: { value: 'John' } });
    //     fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    //     fireEvent.change(contactNumberInput, { target: { value: '1234567890' } });

    //     expect(firstNameInput.value).toBe('John');
    //     expect(lastNameInput.value).toBe('Doe');
    //     expect(contactNumberInput.value).toBe('1234567890');
    //   });

    //   test('role dropdown works', () => {
    //     render(<AddUserForm />);
    //     const rolesDropdown = screen.getByLabelText(/Roles/i);
    //     fireEvent.change(rolesDropdown, { target: { value: 'Admin' } });
    //     expect(rolesDropdown.value).toBe('Admin');
    //   });

    //   test('form submission with all fields filled', async () => {
    //     render(<AddUserForm />);
    //     fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    //     fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    //     fireEvent.change(screen.getByLabelText(/Contact Number/i), { target: { value: '1234567890' } });
    //     fireEvent.change(screen.getByLabelText(/Roles/i), { target: { value: 'Admin' } });

    //     fireEvent.click(screen.getByText(/Add/i));

    //     await waitFor(() => {
    //       // Mock function or assertion to check form submission
    //       // For example, checking if a mock function was called
    //     });
    //   });

    //   test('form submission with missing fields', async () => {
    //     render(<AddUserForm />);
    //     fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: '' } });
    //     fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: '' } });

    //     fireEvent.click(screen.getByText(/Add/i));

    //     await waitFor(() => {
    //       expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    //       expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    //     });
    //   });

    //   test('validation messages for required fields', async () => {
    //     render(<AddUserForm />);
    //     fireEvent.click(screen.getByText(/Add/i));
    //     await waitFor(() => {
    //       expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    //       expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    //       expect(screen.getByText(/Contact Number is required/i)).toBeInTheDocument();
    //     });
    //   });

    //   test('cancel button works', () => {
    //     const handleCancel = jest.fn();
    //     render(<AddUserForm onCancel={handleCancel} />);
    //     fireEvent.click(screen.getByText(/Cancel/i));
    //     expect(handleCancel).toHaveBeenCalled();
    //   });

    //   test('country code dropdown functionality', () => {
    //     render(<AddUserForm />);
    //     const countryCodeDropdown = screen.getByLabelText(/Country Code/i);
    //     fireEvent.change(countryCodeDropdown, { target: { value: '+1' } });
    //     expect(countryCodeDropdown.value).toBe('+1');
    //   });
});
