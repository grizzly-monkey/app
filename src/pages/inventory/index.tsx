import InventoryTable from "./inventoryTable";
import "./style.scss";

const Inventory = () => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        width: "100%",
        padding: "20px",
      }}
    >
      <InventoryTable />
    </div>
  );
};

export default Inventory;
