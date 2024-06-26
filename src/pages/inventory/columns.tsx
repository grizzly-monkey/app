import { TableProps } from "antd";
import { Inventory } from "./types";

const columns: TableProps<Inventory>["columns"]=[
    {
        title: "Name",
        dataIndex: "name",
        key: "1"
    },
    {
        title: "Provider",
        dataIndex: "provider",
        key: "2"
    },
    {
        title:'Initial Stock',
        dataIndex:'initialStock',
        key:'3',
        render:(_,record)=>{
            return record.quantity + record.used + record.wastage
        }
    },
    {
        title: "Stock",
        dataIndex: "quantity",
        key: "quantity"
    },
   
    {
        title: "Used",
        dataIndex: "used",
        key: "used"
    },
    {
        title: "Wastage",
        dataIndex: "wastage",
        key: "wastage"
    },
    
]
export default columns;