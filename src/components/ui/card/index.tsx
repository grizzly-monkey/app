import { Card as AntdCard, CardProps } from "antd";
import './style.scss';

const Card =(props: CardProps)=>{
    return <AntdCard className="transition" {...props} />
}

export default Card;
