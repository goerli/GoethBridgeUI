import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './TxSummary.css';
import { Row, Col, Card } from 'antd';

class TxSummary extends Component {

  getEtherscanLink = () => {
    const { network, eventEvent } = this.props.txData;
    const { transactionHash } = eventEvent;
    let url;
    if (network === 'ropsten') {
      url = `https://ropsten.etherscan.io/tx/${transactionHash}`;
    } else if (network === 'kovan') {
      url = `https://kovan.etherscan.io/tx/${transactionHash}`;
    } else if (network === 'rinkeby') {
     url = `https://rinkeby.etherscan.io/tx/${transactionHash}`;
    }  
    return url;
  };

  render() {
    const { eventEvent, goerliRecipient, network  } = this.props.txData;
    const { address, blockHash, blockNumber, data, event, eventSignature, topics, transactionHash, transactionIndex } = eventEvent;
    return (
      <div>
        <Row>
          <Col>
            <Card className="cardContainer">
              <div className="textContainer">
                <p className="textHeader"> Withdraw Contract Event: {network} </p>
                <p className="textTitle">Goerli Reciept </p>
                <p className="textData">{goerliRecipient} </p>
              </div>           
            </Card>
          </Col>           
        </Row>
        <Row>
          <Col>
            <Card className="cardContainer">
              <div className="textContainer">
                <p className="textHeader"> Deposit Contract Event: {network} </p>
                <p className="textTitle">Address: </p>
                <p className="textData">{address} </p>
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
                <p className="textData"> 
                  <a href={this.getEtherscanLink()}> {transactionHash} </a> </p>
                <p className="textTitle">Transaction Index: </p>
                <p className="textData">{transactionIndex} </p>
              </div>           
            </Card>
          </Col>           
        </Row>
      </div>
    );
  }
}

export default TxSummary;