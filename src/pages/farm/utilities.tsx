export const deviceValue = (device) => {
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
