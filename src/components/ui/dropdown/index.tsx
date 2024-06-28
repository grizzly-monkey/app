import {DropdownProps as AntdDropdownProps, Dropdown as AntdDropdown} from 'antd'


const Dropdown = (props: AntdDropdownProps) => {
    return (
      <AntdDropdown {...props}>
        {props.children}
      </AntdDropdown>
    );
  };
  
  export default Dropdown;


  