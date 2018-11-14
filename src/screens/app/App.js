import React, { Component } from 'react';
import 'antd/dist/antd.css'
import './App.css';
import NavigationHeader from './components/Header';
import { Layout, Row, Col, Card, List } from 'antd';
import ContractForm from './components/ContractForm';
const { Footer } = Layout;

const data = [
  {
    type: 'Withdrawl',
    txHash: '0xf75bcbedc6e85b1198fbceaab9d3d7076b5aa22cc136769b775061eeff85fb6d',
  },
];

class App extends Component {
  render() {
    return (
      <Layout>
        <NavigationHeader />
        <div style={{ marginTop: '2.5%' }}>
          <Row>
            <Col>
              <Card
                style={{ width: '90%', margin: '0 auto' }}>
                <ContractForm />
              </Card>
            </Col>           
          </Row>
        </div>
        <div>
          <Row>
            <Col>
              <Card
                style={{ width: '90%', margin: '0 auto' }}>
                 <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta                         
                          title={item.title}
                          description={item.txHash}
                        />
                      </List.Item>
                    )}
                  />
              </Card>
            </Col>           
          </Row>
        </div>
        <Footer> Goerli </Footer>
      </Layout>
    );
  }
}

export default App;
