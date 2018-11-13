import React, { Component } from 'react';
import 'antd/dist/antd.css'
import './App.css';
import NavigationHeader from './components/Header';
import { Layout, Row, Col } from 'antd';
import ContractForm from './components/ContractForm';
const { Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout>
        <NavigationHeader />
        <Row>
          <Col>
            <ContractForm />
          </Col>           
        </Row>
        <Footer> Goerli </Footer>
      </Layout>
    );
  }
}

export default App;
