import { Input as AntdInput, Form, InputProps } from "antd";
import { Rule } from "antd/es/form";

interface AntdInputProps extends InputProps {
  rules?: Rule[];
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
      <AntdInput disabled={disabled} placeholder={placeholder} />
    </Form.Item>
  );
};

export default Input;
