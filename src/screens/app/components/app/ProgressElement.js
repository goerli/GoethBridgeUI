import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './ProgressElement.css';
import { Row, Col, Card, Progress, Steps } from 'antd';

const Step = Steps.Step;

class ProgressElement extends Component {
  render() {
    const { activated, depositRecieved, withdrawRecieved } =  this.props;
    let progress = 0;
    let step = 0;
    const noProgress = !depositRecieved && !withdrawRecieved;
    const partProgress = depositRecieved && !withdrawRecieved;
    const finished = depositRecieved && withdrawRecieved;
    if (noProgress) {
      progress = 5;
    } 
    if (partProgress) {
      progress = 50;
      step = 1;
    } 
    if(finished) {
      progress = 95;
      step = 2;
    }
    
    return (
      <div>
         {
          !activated || finished ? null
          : <Row style={progressContainer}>
              <Col>
                <Card className="cardContainer"> 
                  <div style={progressElement}>
                    <Progress  type="circle" percent={progress} />
                  </div>
                </Card>
              </Col>
            </Row>
         }
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

const progressContainer = {
  marginBottom: '2.5%',
};

const progressElement = {
  display: 'flex', 
  alignContent: 'center', 
  alignItems: 'center', 
  justifyContent:'center',
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