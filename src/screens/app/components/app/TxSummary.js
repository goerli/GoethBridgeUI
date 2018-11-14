import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './TxSummary.css';
import { Row, Col, Card } from 'antd';

class TxSummary extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Card className="cardContainer">
            <div className="textContainer">
              <p className="textTitle">Block Number </p>
              <p className="textData">327812378231879231 </p>
              <p className="textTitle">TX Hash </p>
              <p className="textData">0xfa9b56385f0f22ea0c8d090fdf6cfee393ea257d0d754483a570183a99a41c1f </p>
              <p className="textTitle">Account </p>
              <p className="textData">0x62a783390694da2a734a11dc43bde2c0b7e2672d </p>
              <p className="textTitle">Value </p>
              <p className="textData">1.9 </p>
            </div>           
          </Card>
        </Col>           
     </Row>
    );
  }
}

export default TxSummary;