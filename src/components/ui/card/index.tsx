import { Card as AntdCard, CardProps } from "antd";
import './style.scss';

const Card =(props: CardProps)=>{
    return <AntdCard {...props} />
}

export default Card;
