import React from "react";
import Card from "@/components/ui/card";
import { MdDelete } from "react-icons/md";
import Fields from "@/utilities/fields/field";

const ZoneCard = ({ zones, onEdit, onDelete, errors }) => {
  const hasErrors = (zone) =>
    errors.some((error) => error.location.includes(`zones.${zone.key}`));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "10px",
        padding: "10px",
      }}
    >
      {zones.map((zone, index) => (
        <div onClick={() => onEdit(zone)}>
          <Card
            bordered={false}
            title={`#${index + 1}`}
            style={{
              borderRadius: "10px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
            className={`zone-card ${hasErrors(zone) ? "zone-card-error" : ""}`}
            extra={
              <div
                style={{
                  color: "red",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(zone.key);
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
                { label: "Area", value: `${zone.area}` },
              ]}
            />
          </Card>
          {hasErrors(zone) && (
            <span style={{ color: "red" }}>Error occured</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ZoneCard;
