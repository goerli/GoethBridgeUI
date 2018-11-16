import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './TxSummary.css';
import { Row, Col, Card } from 'antd';

class TxSummary extends Component {
  render() {
    const { eventRecipient, eventValue, eventToChain, eventEvent, goerliRecipient, goerliValue, goerliFromChain, network  } = this.props.txData;
    const { address, args, blockHash, blockNumber, data, event, eventSignature, topics, transactionHash, transactionIndex } = eventEvent;
    console.log({eventRecipient, eventValue, eventToChain, eventEvent, goerliRecipient, goerliValue, goerliFromChain});
    
    return (
      <div>
        <Row>
          <Col>
            <Card className="cardContainer">
              <div className="textContainer">
                <p className="textHeader"> Deposit Contract Event: {network} </p>
                <p className="textTitle">Address: </p>
                <p className="textData">{address} </p>
                {/* <p className="textTitle">Args: </p>
                <p className="textData">{args} </p> */}
                <p className="textTitle">Block Hash: </p>
                <p className="textData">{blockHash} </p>
                <p className="textTitle">Block Number </p>
                <p className="textData"> {blockNumber} </p>
                <p className="textTitle">Data: </p>
                <p className="textData">{data} </p>
                <p className="textTitle">Event Type: </p>
                <p className="textData">{event} </p>
                <p className="textTitle">Event Signature: </p>
                <p className="textData">{eventSignature} </p>
                <p className="textTitle">Topics </p>
                <p className="textData"> {topics} </p>
                <p className="textTitle">Transaction Hash: </p>
                <p className="textData">{transactionHash} </p>
                <p className="textTitle">Transaction Index: </p>
                <p className="textData">{transactionIndex} </p>
                {/* <p className="textTitle">To Chain: </p>
                <p className="textData">{eventSignature._hex} </p>
                <p className="textTitle">Event Value: </p>
                <p className="textData">{eventValue._hex} </p> */}
              </div>           
            </Card>
          </Col>           
        </Row>
        <Row>
          <Col>
            <Card className="cardContainer">
              <div className="textContainer">
                <p className="textTitle">E: Rec </p>
                <p className="textData">{eventRecipient} </p>
                <p className="textTitle">W Rec </p>
                <p className="textData">{goerliRecipient} </p>
      
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
      </div>
    );
  }
}

export default TxSummary;