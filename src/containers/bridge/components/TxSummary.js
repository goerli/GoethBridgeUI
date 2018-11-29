import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Card, Collapse, Tabs, Input } from 'antd';

const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

class TxSummary extends Component {
  state = { 
    activeTab: 1,
  };

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

  callback = (key) => {
    console.log(key);
  }

  handleChange = () => {}

  render() {
    const { eventEvent, goerliResponse } = this.props.txData;
    const { address, blockHash, blockNumber, data, event, eventSignature, topics, transactionHash, transactionIndex } = eventEvent;
    return (
      <div>
        <Row style={{overflow:'scroll'}}>
          <Col>
            <Tabs defaultActiveKey="1" onChange={() => this.callback}>
              <TabPane tab="Deposit" key="1">
              <Collapse bordered={false} defaultActiveKey={['1']}>
                <Panel header={'Deposit Contract Event'} key="2" style={customPanelStyle}>
                  <Card style={cardContainer}>
                    <div style={textContainer}>
                      <p style={headerStyles}>Address: </p> 
                      <p style={dataStyles}>{address} </p> 
                      <p style={headerStyles}>Block Hash: </p> 
                      <p style={dataStyles}>{blockHash} </p> 
                      <p style={headerStyles}>Block Number </p> 
                      <p style={dataStyles}> {blockNumber} </p> 
                      <p style={headerStyles}>Data: </p> 
                      <Input onChange={() => this.handleChange} value={data} />
                      <p style={headerStyles}>Event Type: </p> 
                      <p style={dataStyles}>{event} </p> 
                      <p style={headerStyles}>Event Signature: </p> 
                      <p style={dataStyles}>{eventSignature} </p> 
                      <p style={headerStyles}>Topics </p> 
                      <Input onChange={() => this.handleChange} value={topics} />
                      <p style={headerStyles}>Transaction Hash: </p>
                      <p style={dataStyles}> <a href={this.getEtherscanLink()} target="_blank" rel="noopener noreferrer"> {transactionHash} </a> </p> 
                      <p style={headerStyles}>Transaction Index: </p> 
                      <p style={dataStyles}>{transactionIndex} </p> 
                    </div>           
                  </Card>
                </Panel>
              </Collapse>
              </TabPane>
              <TabPane tab="Withdraw" key="2">
              <Collapse bordered={false} defaultActiveKey={['1']}>
                <Panel header={'Withdraw Contract Event'} key="1" style={customPanelStyle}>
                  <Card style={cardContainer}>
                    <div style={textContainer}>                      
                      <p style={headerStyles}>Contract Address </p> 
                      <p style={dataStyles}>{goerliResponse.address} </p>
                      <p style={headerStyles}>Block Hash </p> 
                      <p style={dataStyles}>{goerliResponse.blockHash} </p>
                      <p style={headerStyles}>Block Number </p> 
                      <p style={dataStyles}>{goerliResponse.blockNumber} </p>
                      <p style={headerStyles}>Transaction Hash </p> 
                      <p style={dataStyles}> 
                        <a href={`https://blockscout.com/eth/goerli/tx/${goerliResponse.transactionHash}`} target="_blank" rel="noopener noreferrer"> {transactionHash} </a> </p>
                      <p style={headerStyles}>Recipient Address </p> 
                      <p style={dataStyles}>{goerliResponse._recipient} </p>
                    </div>           
                  </Card>
                </Panel>
              </Collapse>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

const textContainer = {
  overflow: 'hidden',
};

const cardContainer = {
  width: '90%',
  margin: '0 auto',
};

const titleStyles = {
  fontWeight: '500',
  color: '#AFA392',
};

const headerStyles = {
  fontWeight: '500',
  color: '#AFA392',
};

const dataStyles = {
  fontWeight: '300',
  color: '#AFA392',
}

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};


export default TxSummary;