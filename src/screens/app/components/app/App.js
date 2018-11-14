import React, { Component } from 'react';

import 'antd/dist/antd.css'
import './App.css';
import { Layout } from 'antd';
import NavigationHeader from '../navigation/Header';
import ContractForm from '../forms/ContractForm';
import TxSummary from './TxSummary';
const { Footer, Content } = Layout;

class App extends Component {
  state= {
    amount: null,
    network: null,
    dataProcessed: false,
  };

  processRequest = ({amount, network}) => {
    this.setState({ amount, network, dataProcessed: true }, function () {
      console.log(this.state);
    });
  }

  render() {
    const { dataProcessed } = this.state;
    return (
      <Layout className="layoutContainer">
        <NavigationHeader />
        <Content>
          <div className="formDivContainer">
            <ContractForm extractData={this.processRequest}/>
          </div>
          <div>
            {
              dataProcessed === true ? <TxSummary /> : null
            }
          </div>
        </Content>
        <Footer className="footer"> ChainSafe Systems </Footer>
      </Layout>
    );
  }
}

export default App;
