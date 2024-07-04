import { TableProps } from "antd";
import { Inventory } from "./types";
import { getTranslation } from "@/translation/i18n";

const columns: TableProps<Inventory>["columns"] = [
  {
    title: getTranslation("global.name"),
    dataIndex: "name",
    key: "1",
  },
  {
    title: getTranslation("inventoryManagement.provider"),
    dataIndex: "provider",
    key: "2",
  },
  {
    title: getTranslation("inventoryManagement.initialStock"),
    dataIndex: "initialStock",
    key: "3",
    render: (_, record) => {
      return record.quantity + record.used + record.wastage;
    },
  },
  {
    title: getTranslation("inventoryManagement.quantity"),
    dataIndex: "quantity",
    key: "4",
    render: (_, record) => {
      return (
        <>
          {record.quantity}{" "}
          <span style={{ paddingLeft: "20px", color:'grey' }}>{record?.unit}</span>
        </>
      );
    },
  },
  {
    title: "State",
    dataIndex: "state",
    key: "5",
    render: () => {
      return <span style={{ color: "red" }}>Low</span>;
    },
  },

  {
    title: getTranslation("inventoryManagement.used"),
    dataIndex: "used",
    key: "6",
    render: (_, record) => {
      return <>{record.used}<span style={{ paddingLeft: "20px", color:'grey' }}>{record?.unit}</span></>;
    }
  },
  {
    title: getTranslation("inventoryManagement.wastage"),
    dataIndex: "wastage",
    key: "7",
    render: (_, record) => {
      return <>{record.wastage}<span style={{ paddingLeft: "20px", color:'grey' }}>{record?.unit}</span></>;
    }
  },
];
export default columns;
