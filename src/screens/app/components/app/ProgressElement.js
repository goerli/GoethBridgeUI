import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './ProgressElement.css';
import { Row, Col, Card, Progress } from 'antd';

class ProgressElement extends Component {
  render() {
    const { activated, depositRecieved, withdrawRecieved } =  this.props;
    let progress = 0;
    const noProgress = !depositRecieved && !withdrawRecieved;
    const partProgress = depositRecieved && !withdrawRecieved;
    const finished = depositRecieved && withdrawRecieved;
    if (noProgress) progress = 5;
    if (partProgress) progress = 50;
    if (finished) progress = 95;
    
    return (
      <Row>
          {
              !activated ? null
              : <Col>
                    <Card className="cardContainer">
                        <p> Transaction Sent </p>
                        {
                            !depositRecieved && !withdrawRecieved ? <p> No events recieved... </p> : null
                        }
                        {
                            depositRecieved ? <p className="recieved"> Deposit Event Recieved... </p> : null
                        }
                        {
                            withdrawRecieved ? <p className="recieved"> Withdraw Event Recieved... </p> : null
                        }
                        <Progress percent={progress} status="active" />
                    </Card>
                </Col>    
          }
               
     </Row>
    );
  }
}

export default ProgressElement;