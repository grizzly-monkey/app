import { errorDetail, errorModel } from "@/types/error";
import { Alert } from "antd";

interface AlertErrorProps {
  error: errorModel;
}

const AlertError = ({ error }: AlertErrorProps) => {
  if (!error) return null;

  if (error?.errors) {
    return error.errors.map(
      (err: errorDetail) =>
        err.message && (
          <Alert
            key={err.error}
            message={err.message}
            type="error"
            closable
            style={{ marginBottom: "10px" }}
          />
        )
    );
  }

  return (
    <Alert
      message="There was an error while processing your request."
      type="error"
      closable
      style={{ marginBottom: "20px" }}
    />
  );
};

export default AlertError;
