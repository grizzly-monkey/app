import { Button as AntdButton } from "antd";
import { BaseButtonProps } from "antd/es/button/button";

interface ButtonProps extends BaseButtonProps {
  label: string;
  style?: React.CSSProperties;
  onClick: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <AntdButton
      {...props}
      type={props.type ? props.type : "primary"}
      style={{
        width: "100%",
        padding: "22px 0",
        borderRadius: "6px",
        boxShadow: "none",
        ...props.style,
      }}
    >
      {props.label}
    </AntdButton>
  );
};

export default Button;
