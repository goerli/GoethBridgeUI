import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './ContractForm.css';
import { Button, Row, Col, Card } from 'antd';
import SelectDropdown from '../inputs/Select';
import FormInputText from '../inputs/FormInputText';

class ContractForm extends Component {

  state= {
    amount: 0,
    network: null,
    errorMessage: null,
  };

  processInputs = async (resObj) => {
    const { error, data, type } = resObj;
    this.setState({ errorMessage: error, [type]: data  }, function () {
      console.log(this.state);
    });
  };

  execute = () => {
    const { amount, network } = this.state;
    this.props.extractData({amount, network});
  };

  render() {
    const { errorMessage, amount } = this.state;
    const hasError = errorMessage !== null;
    const formComplete = amount !== 0 && !hasError;
    return (
      <Row>
        <Col>
          <Card className="cardContainer">
            <div className="componentContainer">
              <div>
                {
                  hasError ? <p className="errorTxt">Error: {errorMessage} </p> : null
                }
              </div>
              <Row type="flex" justify="space-around" gutter={16} className="formContainer">
                <Col xs={24} sm={12} md={8} lg={8} span={4}>
                  <FormInputText type="amount" placeholderText="Amount" returnValue={this.processInputs} />
                </Col>           
                <Col xs={24} sm={12} md={8} span={4}>
                  <SelectDropdown type="network" returnValue={this.processInputs} />
                </Col>
                <Col xs={24} sm={12} md={8} span={4}>
                  <Button 
                    disabled={!formComplete}
                    className="btn"
                    onClick={() => this.execute()} 
                    type= {!formComplete ? 'danger': 'primary'}
                    block>
                    Send to Bridge
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}


export default ContractForm;