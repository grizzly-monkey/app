import { Device } from "./types";

export const deviceValue = (device: Device) => {
  if (!device)
    return (
      <span className="activeTag" style={{ backgroundColor: "orange" }}>
        Not-configured
      </span>
    );
  else if (device?.status === "up")
    return (
      <span className="activeTag" style={{ backgroundColor: "green" }}>
        Active
      </span>
    );
  else if (device?.status === "down")
    return (
      <span className="activeTag" style={{ backgroundColor: "red" }}>
        Down
      </span>
    );

  return <></>;
};
