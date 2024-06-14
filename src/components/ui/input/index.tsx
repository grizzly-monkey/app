import { Input as AntdInput, Form, InputProps } from "antd";
import "./style.scss";

interface AntdInputProps extends InputProps {
  rules?: { required: true; message: string }[];
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

const Input = ({
  rules,
  name,
  label,
  placeholder,
  className,
  disabled,
}: AntdInputProps) => {
  return (
    <Form.Item
      name={name}
      label={label}
      className={className}
      rules={rules}
      style={{ marginBottom: "20px" }}
    >
      <AntdInput className="common-input" disabled={disabled} placeholder={placeholder} />
    </Form.Item>
  );
};

export default Input;
