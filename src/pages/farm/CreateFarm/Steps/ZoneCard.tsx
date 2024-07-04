import React from "react";
import Card from "@/components/ui/card";
import { MdDelete } from "react-icons/md";
import Fields from "@/utilities/fields/field";

const ZoneCard = () => {
  const zones = [
    {
      name: "zone1",
      zoneId: "zn5efbb975",
      systemType: "NFT system",
      area: 100,
      growingArea: {
        wateringType: "Manual",
        wateringSchedule: "monday",
        area: 100,
        rowCount: 50,
        plantCountPerRow: 4,
        plantSpacing: 5,
        rowSpacing: 5,
      },
      createdBy: "61530dca-7031-70da-b1d5-db5d1ecf29c2",
      updatedBy: "61530dca-7031-70da-b1d5-db5d1ecf29c2",
      createdDate: "2024-04-26T09:06:47.802Z",
      updatedDate: "2024-04-26T09:06:47.802Z",
    },
    {
      name: "zone2",
      zoneId: "zn7fgc1265",
      systemType: "DWC system",
      area: 150,
      growingArea: {
        wateringType: "Automatic",
        wateringSchedule: "tuesday",
        area: 150,
        rowCount: 60,
        plantCountPerRow: 5,
        plantSpacing: 6,
        rowSpacing: 6,
      },
      createdBy: "71540ecb-8032-80eb-c2d6-fc6e2f3f3g4h",
      updatedBy: "71540ecb-8032-80eb-c2d6-fc6e2f3f3g4h",
      createdDate: "2024-05-01T10:10:10.123Z",
      updatedDate: "2024-05-01T10:10:10.123Z",
    },
    {
      name: "zone3",
      zoneId: "zn8hij7890",
      systemType: "Aeroponic system",
      area: 200,
      growingArea: {
        wateringType: "Drip",
        wateringSchedule: "wednesday",
        area: 200,
        rowCount: 70,
        plantCountPerRow: 6,
        plantSpacing: 7,
        rowSpacing: 7,
      },
      createdBy: "81550fdc-9033-90fc-d3e7-gd7h3f4f5i6j",
      updatedBy: "81550fdc-9033-90fc-d3e7-gd7h3f4f5i6j",
      createdDate: "2024-05-15T11:11:11.456Z",
      updatedDate: "2024-05-15T11:11:11.456Z",
    },
    {
      name: "zone4",
      zoneId: "zn9klm0123",
      systemType: "Hydroponic system",
      area: 250,
      growingArea: {
        wateringType: "Ebb and Flow",
        wateringSchedule: "thursday",
        area: 250,
        rowCount: 80,
        plantCountPerRow: 7,
        plantSpacing: 8,
        rowSpacing: 8,
      },
      createdBy: "91560gfd-1034-91gd-e4f8-he8i4g5g6j7k",
      updatedBy: "91560gfd-1034-91gd-e4f8-he8i4g5g6j7k",
      createdDate: "2024-06-01T12:12:12.789Z",
      updatedDate: "2024-06-01T12:12:12.789Z",
    },
  ];

  console.log(zones);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "10px",
        padding: "10px",
      }}
    >
      {zones.map((zone) => (
        <div key={zone.zoneId}>
          <Card
            bordered={false}
            title={zone.zoneId}
            style={{
              borderRadius: "10px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
            extra={
              <div
                style={{
                  color: "red",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
              >
                <MdDelete />
              </div>
            }
          >
            <Fields
              info={[
                {
                  label: "Name",
                  value: <span style={{ width: "100%" }}>{zone.name}</span>,
                },
                // { label: "System type", value: `${zone.systemType}` },
                { label: "Area", value: `${zone.area}` },
              ]}
            />
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ZoneCard;
