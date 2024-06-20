import React from "react";
import { Card, Col, Row } from "antd";
import Fields from "@/utilities/fields/field";

const FarmCard = () => {
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

  return (
    <div>
      <div className="grid-container">
        {cardData.map((card, i) => (
          <div key={i} className="grid-item">
            <Card
              title={card?.name}
              bordered={false}
              style={{
                borderRadius: "10px",
                // boxShadow: "0 4px 6px rgb(0 0 0 / 12%)",
                // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",

                // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <div>
                <Fields
                  info={[
                    { label: "Farm Area", value: <span>{card.area}</span> },
                    {
                      label: "Cultivable Area",
                      value: <span>{card.cultivableArea}</span>,
                    },
                    {
                      label: "Device status",
                      value: (
                        <span className="activeTag">{card.deviceStatus}</span>
                      ),
                    },
                  ]}
                />
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmCard;
