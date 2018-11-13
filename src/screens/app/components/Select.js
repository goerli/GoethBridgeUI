import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Select } from 'antd';

const Option = Select.Option;

class SelectDropdown extends Component {

  state = { 
    network: 'kovan',
  };

  componentDidMount = () => {
    const { network } = this.state;
    const { type } = this.props;
    this.props.returnValue({ data: network, error: null, type });
  }

  handleChange = (value) => {
    this.setState({network: value});
    const { type } = this.props;
    this.props.returnValue({ data: value, error: null, type });
  }
    
  handleBlur = () => {
    console.log('blur');
  }
    
  handleFocus = () => {
    console.log('focus');
  }

  render () { 
    const { network } = this.state;
    return (
      <Select
        showSearch
        style={{ width: '100%' }}
        placeholder={network}
        optionFilterProp="children"
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
        <Option value="ropsten">Ropsten</Option>
        <Option value="kovan">Kovan</Option>
        <Option value="rinkeby">Rinkeby</Option>
      </Select>
    );
  }
}

export default SelectDropdown;






