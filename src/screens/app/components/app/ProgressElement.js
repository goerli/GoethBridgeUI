import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './ProgressElement.css';
import { Row, Col, Card, Steps } from 'antd';

const Step = Steps.Step;

class ProgressElement extends Component {
  render() {
    const { activated, depositRecieved, withdrawRecieved } =  this.props;
    let step = 0;
    const partProgress = depositRecieved && !withdrawRecieved;
    const finished = depositRecieved && withdrawRecieved;
    if (partProgress) {
      step = 1;
    } 
    if(finished) {
      step = 2;
    }
    
    return (
      <div> 
        <Row>
          {
            !activated || finished ? null
            : <Col>
                <Card className="cardContainer">
                <div style={stepContainer}>
                  <br />
                  <Steps progressDot current={step}>
                    <Step title="Transaction Executed" description="Events are waiting to be registered and displayed." />
                    <Step title="Deposit Recieved" description="Deposit event has been recieved." />
                    <Step title="Withdraw Recieved" description="Withdraw event on Goerli recieved." />
                  </Steps>
                  <br />
                  <p style={text}> could take a few minutes... </p>
                </div>
              </Card>
            </Col>    
          }       
      </Row>
     </div>
    );
  }
}

const stepContainer = {
  width: "80%", 
  paddingTop: '5%', 
  paddingBottom: '5%',
  margin: '0 auto', 
};

const text = {
  fontSize: '1.3em',
  fontWeight: '500',
  color: '#AFA392',
  textAlign: 'center',
};

export default ProgressElement;