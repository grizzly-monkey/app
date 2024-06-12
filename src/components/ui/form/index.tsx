import { Form as AntdForm, FormProps as AntdFormProps } from "antd";

interface FormProps extends AntdFormProps {
  children: React.ReactNode;
}

const Form = (props: FormProps) => {
  return (
    <AntdForm layout="vertical" {...props}>
      {props.children}
    </AntdForm>
  );
};

export default Form;
