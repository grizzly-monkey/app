import React from "react";
import { Card, Col, Row } from "antd";


const FarmCard = () => {
    const cardData = ["Card content 1", "Card content 2", "Card content 3", "Card content 4", "Card content 5"]
  
  return (
    <div>
      {/* <div>
        <GrRefresh />
        <div >
       
        </div>
        
      </div> */}
      <div className="grid-container">
        {
            cardData.map((card, i) => 
                <div key={i} className="grid-item">

            <Card title={card} bordered={true}>
            Card content
          </Card>

                </div>
            )

        }
      </div>
    </div>
  );
};

export default FarmCard;
