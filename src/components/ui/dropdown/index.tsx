import {DropdownProps as AntdDropdownProps, Dropdown as AntdDropdown} from 'antd'


interface DropdownProps extends AntdDropdownProps {
    children: React.ReactNode;
}

const Dropdown = (props: AntdDropdownProps) => {
    return (
      <AntdDropdown {...props}>
        {props.children}
      </AntdDropdown>
    );
  };
  
  export default Dropdown;


  