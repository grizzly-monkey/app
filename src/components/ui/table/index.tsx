import { Table as AntdTable } from "antd";
import { TableProps } from "antd";

const Table = (props : TableProps) => {
  return <AntdTable {...props} />;
};

export default Table;