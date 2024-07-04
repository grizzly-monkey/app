import React from "react";
import { useSelector } from "react-redux";
import { Card, Col, Row } from "antd";
import Fields from "@/utilities/fields/field";
import FarmSelectors from "@/redux/farm/FarmSelectors";

const FarmCard = () => {
  const farms = useSelector(FarmSelectors.SelectDenormalizeFarm);
  console.log("farms in card", farms);
  const cardData = [
    {
      name: "Farm name 1",
      area: 500,
      cultivableArea: 400,
      deviceStatus: "Active",
    },

    {
      name: "Farm name 2",
      area: 500,
      cultivableArea: 400,
      deviceStatus: "Active",
    },

    {
      name: "Farm name 3",
      area: 500,
      cultivableArea: 400,
      deviceStatus: "Active",
    },

    {
      name: "Farm name 4",
      area: 500,
      cultivableArea: 400,
      deviceStatus: "Active",
    },

    {
      name: "Farm name 5",
      area: 500,
      cultivableArea: 400,
      deviceStatus: "Active",
    },
  ];

  // if (farm && !farm?.device) {
  //   deviceStatus = <Chip label="Not configured" color="warning" />;
  // } else if (farm?.device?.status === "up") {
  //   deviceStatus = <Chip label="Active" color="success" />;
  // } else if (farm?.device?.status === "down") {
  //   deviceStatus = <Chip label="Down" color="error" />;
  // }

  const deviceValue = (device) => {
    if (!device)
      return (
        <span className="activeTag" style={{ backgroundColor: "orange" }}>
          Not configured
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

  return (
    <div>
      <div className="grid-container">
        {farms &&
          farms.map((card, i) => (
            <div key={i} className="grid-item">
              <Card
                title={card?.name}
                bordered={false}
                style={{
                  borderRadius: "10px",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
              >
                <div>
                  <Fields
                    info={[
                      { label: "Farm Area", value: <span>{card.area}</span> },
                      {
                        label: "Cultivable Area",
                        value: (
                          <span style={{ flex: "2" }}>
                            {card.cultivableArea}
                          </span>
                        ),
                      },
                      {
                        label: "Device status",
                        value: deviceValue(card.device),
                      },
                    ]}
                  />
                </div>
              </Card>
            </div>
          ))}

        {!farms && <span style={{ backgroundColor: "gray" }}>No farms</span>}
      </div>
    </div>
  );
};

export default FarmCard;
