import { Select as AntdSelect, SelectProps } from "antd";

const Select= (props:SelectProps)=>{
    return <AntdSelect className="common-select" {...props}/>
}

export default Select;