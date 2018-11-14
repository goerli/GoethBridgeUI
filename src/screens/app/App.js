import React, { Component } from 'react';

import 'antd/dist/antd.css'
import './App.css';
import { Layout, Row, Col, Card } from 'antd';
import NavigationHeader from './components/Header';
import ContractForm from './components/ContractForm';
const { Footer, Content } = Layout;

class App extends Component {
  state= {
    amount: null,
    network: null,
    dataProcess: false,
  };

  processRequest = ({amount, network}) => {
    this.setState({ amount, network, dataProcess: true }, function () {
      console.log(this.state);
    });
  }

  render() {
    return (
      <Layout style={{height:'100vh'}}>
        <NavigationHeader />
        <Content>
        <div style={{ marginTop: '2.5%', marginBottom:'2.5%' }}>
          <Row>
            <Col>
              <Card style={{ width: '90%', margin: '0 auto' }}>
                <ContractForm extractData={this.processRequest}/>
              </Card>
            </Col>           
          </Row>
        </div>
        <div>
          <Row>
            <Col>
              <Card style={{ width: '90%', margin: '0 auto' }}>
                <p style={{fontSize:'1.3em', fontWeight:500}}>Block Number </p>
                <p style={{fontSize:'1.1em', fontWeight:300}}>327812378231879231 </p>
                <p style={{fontSize:'1.3em', fontWeight:500}}>TX Hash </p>
                <p style={{fontSize:'1.1em',fontWeight:300}}>0x321jk3jkh123jkh3jkgdjhasjkhdskjhasdkjhdsakjhdsakjh </p>
                <p style={{fontSize:'1.3em', fontWeight:500}}>Account </p>
                <p style={{fontSize:'1.1em', fontWeight:300}}>0xhj342hgj432jhg432hjg432jhg43jh2g432jhg </p>
                <p style={{fontSize:'1.3em', fontWeight:500}}>Value </p>
                <p style={{fontSize:'1.1em', fontWeight:300}}>1.9 </p>                
              </Card>
            </Col>           
          </Row>
        </div>
        </Content>
        <Footer style={{ display:'flex', justifyContent:'center', backgroundColor:'#'}}> Goerli Bridge </Footer>
      </Layout>
    );
  }
}

export default App;
