import Card from "@/components/ui/card";
import Table from "@/components/ui/table";
import columns from "./columns";

const InventoryTable = () => {
  const data = [
    {
      inventoryId: "664b0c6c8ddd14d25e8373cc",
      productId: "6579d816026c967a135f49c8",
      name: "Cherry Tomato",
      farmId: "fm1a215ac2",
      description: "test",
      provider: "growloc",
      quantity: 443.8,
      unit: "nos",
      used: 56.2,
      wastage: 0,
      createdBy: "61530dca-7031-70da-b1d5-db5d1ecf29c2",
      updatedBy: "61530dca-7031-70da-b1d5-db5d1ecf29c2",
      createdDate: "2024-05-20T08:40:12.000Z",
      updatedDate: "2024-05-28T10:30:10.834Z",
    },
    {
      inventoryId: "664b0c8f8ddd14d25e8373cd",
      productId: "661d3e3502d8e7569854513e",
      name: "Pesticide",
      farmId: "fm1a215ac2",
      description: "test",
      provider: "growloc",
      quantity: 340,
      unit: "nos",
      used: 60,
      wastage: 0,
      createdBy: "61530dca-7031-70da-b1d5-db5d1ecf29c2",
      updatedBy: "61530dca-7031-70da-b1d5-db5d1ecf29c2",
      createdDate: "2024-05-20T08:40:47.649Z",
      updatedDate: "2024-06-25T14:55:21.573Z",
    },
    {
      inventoryId: "664b292b8ff923a4e4869763",
      productId: "6626234c3c4db8c98290828e",
      name: "NPK",
      farmId: "fm1a215ac2",
      description: "test",
      provider: "growloc",
      quantity: 158.25,
      unit: "L",
      used: 41.75,
      wastage: 0,
      createdBy: "61530dca-7031-70da-b1d5-db5d1ecf29c2",
      updatedBy: "61530dca-7031-70da-b1d5-db5d1ecf29c2",
      createdDate: "2024-05-20T10:42:51.733Z",
      updatedDate: "2024-05-31T08:56:28.788Z",
    },
  ];
  return (
    <Card
      style={{
        width: "100%",
        height: "fit-content",
        paddingTop: "20px",
      }}
      bordered={false}
      title={"Inventory"}
      className="criclebox tablespace"
    >
      <div className="table-responsive">
        <Table
         rowSelection={
            {
              type: "checkbox",
              onChange: (selectedRowKeys, selectedRows) => {
                console.log(selectedRowKeys, selectedRows);
              },
            }
          
         }
          columns={columns}
          dataSource={data}
          className="ant-border-space"
        />
      </div>
    </Card>
  );
};

export default InventoryTable;
