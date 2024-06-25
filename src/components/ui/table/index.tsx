import { Table as AntdTable } from "antd";
import { TableProps } from "antd";
import './style.scss';

const Table = (props : TableProps) => {
  const {dataSource} = props;
  dataSource?.map((data: any, index) => {
    data.key = index;
  });
  return <AntdTable {...props} />;
};

export default Table;