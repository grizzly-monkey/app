import { TableProps } from "antd";
import { Inventory } from "./types";
import { getTranslation } from "@/translation/i18n";

const columns: TableProps<Inventory>["columns"]=[
    {
        title: getTranslation("global.name"),
        dataIndex: "name",
        key: "1"
    },
    {
        title: getTranslation("inventoryManagement.provider"),
        dataIndex: "provider",
        key: "2"
    },
    {
        title:getTranslation('inventoryManagement.initialStock'),
        dataIndex:'initialStock',
        key:'3',
        render:(_,record)=>{
            return record.quantity + record.used + record.wastage
        }
    },
    {
        title: getTranslation("inventoryManagement.quantity"),
        dataIndex: "quantity",
        key: "quantity",
        render:(_,record)=>{
            return <>{record.quantity} <span style={{color:"red", paddingLeft:'20px'}}>Low</span></>
        }
    },
   
    {
        title: getTranslation("inventoryManagement.used"),
        dataIndex: "used",
        key: "used"
    },
    {
        title: getTranslation("inventoryManagement.wastage"),
        dataIndex: "wastage",
        key: "wastage"
    },
    
]
export default columns;