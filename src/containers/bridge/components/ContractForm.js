import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './ContractForm.css';
import { Button, Row, Col, Card } from 'antd';
import FormInputText from './FormInputText';

class ContractForm extends Component {

  state= {
    amount: 0,
    network: this.props.activeNetwork,
    errorMessage: null,
    activated: false,
  };

  processInputs = async (resObj) => {
    const { error, data, type } = resObj;
    this.setState({ errorMessage: error, [type]: data  }, function () {});
  };

  execute = async () => {
    const { amount } = this.state;
    await this.setState({activated: true });
    this.props.extractData({amount});
  };

  reset = async () => {
    await this.setState({activated: false });
    this.props.reset();
  }

  render() {
    const { errorMessage, amount, activated, resetData } = this.state;
    const hasError = errorMessage !== null;
    const formComplete = amount !== 0 && !hasError;
    const isMainnet = this.props.activeNetwork === 'main';
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
                  <FormInputText resetField={resetData} isDisabled={false} type="amount" placeholderText="Ether Amount" returnValue={this.processInputs} />
                </Col>           
                <Col xs={24} sm={12} md={8} span={4}>
                  <FormInputText isDisabled={true} placeholderText={this.props.activeNetwork} />
                </Col>
                <Col xs={24} sm={12} md={8} span={4}>
                {
                  activated 
                  ?  <Button
                        disabled={!this.props.eventsComplete} 
                        onClick={() => this.reset()} 
                        type="danger">Clear Data
                      </Button> 
                  :  <Button 
                      disabled={!formComplete || isMainnet}
                      className="btn"
                      onClick={() => this.execute()} 
                      type= {!formComplete ? 'danger': 'primary'}
                      block>
                      Send to Bridge
                    </Button>
                }
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