import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css'
import NavigationHeader from '../layout/Header';
import SiderMenu from '../layout/SiderMenu';
import { Layout, Menu, Breadcrumb, Icon, Timeline } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

const RoadmapPage = () => (
  <Layout style={layoutStyle}>
  <NavigationHeader />
  <Layout>
    <SiderMenu />
    <Layout style={{ padding: '0 24px 24px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Network</Breadcrumb.Item>
          <Breadcrumb.Item>Roadmap</Breadcrumb.Item>
      </Breadcrumb>
      <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
        <h3> Goerli UI Roadmap </h3>
        <br />
        <Timeline>
           <Timeline.Item color="green">Network Stats</Timeline.Item>
           <Timeline.Item color="green">Bridge UI</Timeline.Item>
           <Timeline.Item color="red">
            <p>Solve x-frame-option: SAMEORIGIN for https://blockscout.com/eth/goerli to display block explorer within Iframe.</p>
          </Timeline.Item>
          <Timeline.Item color="red">
            <p>Refactor and implement faucet</p>
          </Timeline.Item>
        </Timeline>
      </Content>
    </Layout>
  </Layout>
</Layout>
);

const layoutStyle = {
  flex: 1, 
  height: '100vh'
};

export default RoadmapPage;
