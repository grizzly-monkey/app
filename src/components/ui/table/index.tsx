import { Table as AntdTable } from "antd";
import { TableProps } from "antd";
import './style.scss';

const Table = (props : TableProps) => {
  return <AntdTable {...props} />;
};

export default Table;