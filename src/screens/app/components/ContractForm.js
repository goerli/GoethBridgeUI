import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Button, Row, Col } from 'antd';
import SelectDropdown from './Select';
import FormInputText from './FormInputText';

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
    console.log('execute'); 
    const { amount, network } = this.state;
    this.props.extractData({amount, network});
  };

  render() {
    const { errorMessage, amount } = this.state;
    const hasError = errorMessage !== null;
    const formComplete = amount !== 0 && !hasError;
    return (
      <div style={{flex:1}}>
        <div>
          {
            hasError ? <p>Error: {errorMessage} </p> : null
          }
          <Row type="flex" justify="space-around" gutter={16} style={{margin: '0 auto'}}>
            <Col xs={24} sm={12} md={8} lg={8} span={4}>
              <FormInputText type="amount" placeholderText="Amount" returnValue={this.processInputs} />
            </Col>           
            <Col xs={24} sm={12} md={8} span={4}>
              <SelectDropdown type="network" returnValue={this.processInputs} />
            </Col>
            <Col xs={24} sm={12} md={8} span={4}>
              <Button 
                disabled={!formComplete}
                onClick={() => this.execute()} 
                style={{width: 200}}
                type= {!formComplete ? 'danger': 'primary'}
                block>
                Send to Bridge
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}


export default ContractForm;