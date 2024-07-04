import { Input as AntdInput, Form, InputProps } from "antd";
import "./style.scss";
import { Rule } from "antd/es/form";

interface AntdInputProps extends InputProps {
  rules?: Rule[];
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  testId?: string;
  iconRender?: any;
  isPasswordInput?: any;
}

const Input = ({
  rules,
  name,
  label,
  placeholder,
  className,
  disabled,
  value,
  onChange,
  onFocus,
  onBlur,
  iconRender,
  isPasswordInput,
  maxLength,
  type,
  testId,
}: AntdInputProps) => {
  const RenderInput = isPasswordInput ? AntdInput.Password : AntdInput;

  return (
    <Form.Item
      name={name}
      label={label}
      className={className}
      rules={rules}
      style={{ marginBottom: "25px" }}
    >
      <RenderInput
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        onFocus={onFocus}
        onBlur={onBlur}
        iconRender={iconRender}
        type={type}
        className="common-input"
        data-testid={testId}
      />
    </Form.Item>
  );
};

export default Input;
