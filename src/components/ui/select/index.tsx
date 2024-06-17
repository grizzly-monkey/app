import { Select as AntdSelect, SelectProps } from "antd";
import "./style.scss"

const Select= (props:SelectProps)=>{
    return <AntdSelect className="common-select" {...props} style={{height:'45px'}}/>
}

export default Select;