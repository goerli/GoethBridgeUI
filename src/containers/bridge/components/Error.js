import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Error.css';
import { Row, Col, Card } from 'antd';

class Error extends Component {
  render() {
    return (
      <Row>
        <Col>
          <Card className="cardContainer">
            <div className="textContainer">
              <p className="textTitle">{this.props.errorMessage} </p>
            </div>           
          </Card>
        </Col>           
     </Row>
    );
  }
}

export default Error;