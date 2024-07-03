import FarmCard from "./farmCard";
import "./style.scss";
import { Card, Flex } from "antd";
import { GrRefresh } from "react-icons/gr";
import Button from "@/components/common/button";
import { useNavigate } from "react-router-dom";
import routePaths from "@/config/routePaths";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import FarmActions from "@/redux/farm/action";

const Farm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FarmActions.fetchFarms());
  });

  return (
    <div className="farm">
      <Card
        bordered={false}
        title="Farm"
        style={{ borderRadius: "10px" }}
        extra={
          <Flex gap={20}>
            <GrRefresh style={{ fontSize: "30px" }} />
            <Button
              label="Add farm"
              onClick={() => {
                navigate(routePaths.farmCreate);
              }}
              style={{ padding: "none" }}
            />
          </Flex>
        }
      >
        <FarmCard />
      </Card>
    </div>
  );
};

export default Farm;
