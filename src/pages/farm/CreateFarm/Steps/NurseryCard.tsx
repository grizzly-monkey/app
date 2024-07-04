import React from "react";
import Card from "@/components/ui/card";
import { MdDelete } from "react-icons/md";
import Fields from "@/utilities/fields/field";
import { getTranslation } from "@/translation/i18n";

const NuseryCard = ({ nurseries, onEdit, onDelete, errors }) => {
  const hasErrors = (nursary) =>
    errors.some((error) => error.location.includes(`nurseries.${nursary.key}`));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "10px",
        padding: "10px",
      }}
    >
      {nurseries.map((nusery, index) => (
        <div key={index} onClick={() => onEdit(nusery)}>
          <Card
            bordered={false}
            title={`#${index + 1}`}
            style={{
              borderRadius: "10px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
            className={`zone-card ${
              hasErrors(nusery) ? "zone-card-error" : ""
            }`}
            extra={
              <div
                style={{
                  color: "red",
                  fontSize: "25px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(nusery.key);
                }}
              >
                <MdDelete />
              </div>
            }
          >
            <Fields
              info={[
                {
                  label: `${getTranslation("global.name")}`,
                  value: <span style={{ width: "100%" }}>{nusery.name}</span>,
                },
                {
                  label: `${getTranslation("global.area")}`,
                  value: `${nusery.area}`,
                },
              ]}
            />
          </Card>

          {hasErrors(nusery) && (
            <span style={{ color: "red" }}>
              {getTranslation("global.errorOccured")}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default NuseryCard;
