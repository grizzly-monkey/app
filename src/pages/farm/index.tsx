import FarmCard from "./farmCard";
import "./style.scss";
import { Card, Flex } from "antd";
import { GrRefresh } from "react-icons/gr";
// import AddFarmButton from "./AddFarm";

const Farm = () => {
  return (
    <div className="farm">
      <Card
        // style={{ width: !selectedUser ? '100%' : 'calc( 100% - 350px)', height:'fit-content' ,paddingTop:'20px'}}
        bordered={false}
        title="Farm"
        style={{borderRadius: '10px'}}
        // className="criclebox tablespace"
        extra={
          <Flex gap={20}>
            <GrRefresh style={{ fontSize:'30px'}} />
            {/* <AddFarmButton /> */}
          </Flex>
        }
      >
      <FarmCard />
        
      </Card>
    </div>
  );
};

export default Farm;
