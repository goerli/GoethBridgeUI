import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css'
import NavigationHeader from '../layout/Header';
import SiderMenu from '../layout/SiderMenu';
import { Layout, Menu, Breadcrumb, Collapse } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
const Panel = Collapse.Panel;

const data = [
  {
    "title": "What is the Goerli Testnet Propsal",
    "content": "There are many Ethereum testnets available for experimenting with smart contracts and deploying decentralised applications before going live on the main Ethereum network. However, there is no testnet available that is both widely usable across all client implementations, and robust enough to guarantee consistent availability and high reliability."
  },
  {"title": "What are the Existing Public Testnets",
  "content": "Olympic, Morden, Ropsten, Kovan, Rinkeby"},
  {"title": "What do we Propose?", "content": "Sufficiently specifying a proof-of-authority engine, such as Aura or Clique, in an EIP, to implement one or multiple of these engines across different clients, such as Geth and Parity Ethereum, and to bootstrap a new simplistic Görli proof-of-authority testnet based on the available implementations that mimics main network conditions."},
]
const AboutPage = () => (
  <Layout style={layoutStyle}>
    <NavigationHeader />
    <Layout>
      <SiderMenu />
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Network</Breadcrumb.Item>
            <Breadcrumb.Item>About</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header={data[0].title} key="1" style={customPanelStyle}>
              <p>{data[0].content}</p>
            </Panel>
            <Panel header={data[1].title} key="2" style={customPanelStyle}>
              <p>{data[1].content}</p>
            </Panel>
            <Panel header={data[2].title} key="3" style={customPanelStyle}>
              <p>{data[2].content}</p>
            </Panel>
          </Collapse>
        </Content>
      </Layout>
    </Layout>
  </Layout>
);

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

const layoutStyle = {
  flex: 1, 
  height: '100%'
};

export default AboutPage;
