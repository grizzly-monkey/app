import FarmCard from "./farmCard";
import "./style.scss";
import { Flex, Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import Card from "@/components/ui/card";
import Button from "@/components/common/button";
import { useNavigate } from "react-router-dom";
import routePaths from "@/config/routePaths";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FarmActions from "@/redux/farm/action";
import FarmSideBar from "./SideBar";
import FarmSelectors from "@/redux/farm/FarmSelectors";
import requestingSelector from "@/redux/requesting/requestingSelector";
import { getTranslation } from "@/translation/i18n";

const Farm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedFarm = useSelector(FarmSelectors.SelectSelectedFarm);
  useEffect(() => {
    dispatch(FarmActions.fetchFarms());
  });

  const onRefresh = () => dispatch(FarmActions.fetchFarms(true));
  const loading = useSelector((state) =>
    requestingSelector(state, [FarmActions.REQUEST_FARMS])
  );

  return (
    <div className="farm">
      <Card
        bordered={false}
        title={getTranslation("global.farm")}
        style={{ borderRadius: "10px" }}
        extra={
          <Flex gap={20}>
            <Tooltip title={getTranslation("global.refresh")}>
              <Button
                className="refreshButton"
                onClick={onRefresh}
                loading={loading}
                icon={<ReloadOutlined style={{ color: "green" }} />}
                label={""}
              />
            </Tooltip>
            <Button
              label={getTranslation("farm.addFarm")}
              onClick={() => {
                navigate(routePaths.farmCreate);
              }}
              style={{ padding: "none" }}
              loading={false}
            />
          </Flex>
        }
      >
        <div className="tableFullHeightContainer">
          <div
            style={{
              transition: "all 0.4s",
              width: !selectedFarm ? "100%" : "calc( 100% - 400px)",
            }}
          >
            <FarmCard />
          </div>

          <FarmSideBar />
        </div>
      </Card>
    </div>
  );
};

export default Farm;
