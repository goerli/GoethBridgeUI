import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Input, Button } from 'antd';
const InputGroup = Input.Group;

class FormInputText extends Component {

  state={
    value: 0,
    type: null,
  };

  handleChange = (e) => {
    const isNumber = this.props.type === 'amount';
    const value = e.target.value;
    const isNumberInvalid = isNaN(value);
    let responseObject = {};
    if (isNumber && !isNumberInvalid) {
      responseObject.data = value;
      responseObject.error = null;
      responseObject.type = this.props.type;
    } else if (isNumber && isNumberInvalid) {
      responseObject.data = value;
      responseObject.error = 'Invalid Number for ethereum amount'; 
      responseObject.type = this.props.type;
    }
    this.props.returnValue(responseObject);
  }

  render() {
    const { placeholderText } = this.props;
    return (
      <div>
        <Input placeholder={placeholderText} onChange={this.handleChange}/>       
      </div>
    );
  }
}

export default FormInputText;