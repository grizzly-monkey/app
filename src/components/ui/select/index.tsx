import { Select as AntdSelect, SelectProps } from "antd";

const Select= (props:SelectProps)=>{
    return <AntdSelect className="common-select" {...props} style={{height:'45px'}}/>
}

export default Select;