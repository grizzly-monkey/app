import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import Fields from "@/utilities/fields/field";
import FarmSelectors from "@/redux/farm/FarmSelectors";
import FarmActions from "@/redux/farm/action";
import { deviceValue } from "./utilities";
import { getTranslation } from "@/translation/i18n";
import requestingSelector from "@/redux/requesting/requestingSelector";
import { LoadingOutlined } from "@ant-design/icons";
import Card from "@/components/ui/card";
import { Farm } from "./types";

const FarmCard = () => {
  const dispatch = useDispatch();
  const farms = useSelector(FarmSelectors.SelectDenormalizeFarm);
  const loading = useSelector((state) =>
    requestingSelector(state, [FarmActions.REQUEST_FARMS])
  );


  console.log("farms in farm card", farms)

  return (
    <div>
      {loading && (
        <span style={{ display: "flex", justifyContent: "center" }}>
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </span>
      )}

      {!loading && farms.length === 0 && (
        <span
          style={{ color: "gray", display: "flex", justifyContent: "center" }}
        >
          {getTranslation("farm.noFarms")}
        </span>
      )}
      {!loading && farms && (
        <div className="grid-container">
          {farms.map((card: Farm, i: string) => (
            <div key={i} className="grid-item">
              <Card
                title={card?.name}
                bordered={false}
                className="cursor_pointer shadow-box"
                onClick={() => dispatch(FarmActions.setSelectedFarm(card))}
              >
                <div>
                  <Fields
                    info={[
                      {
                        label: `${getTranslation("farm.farmArea")}`,
                        value: <span>{card?.area}</span>,
                      },
                      {
                        label: `${getTranslation("farm.cultivableArea")}`,
                        value: (
                          <span style={{ flex: "2" }}>
                            {card?.cultivableArea}
                          </span>
                        ),
                      },
                      {
                        label: `${getTranslation("farm.deviceStatus")}`,
                        value: (
                          <span style={{ flexWrap: "wrap" }}>
                            {deviceValue(card?.device)}
                          </span>
                        ),
                      },
                    ]}
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmCard;
