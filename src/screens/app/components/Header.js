import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Layout, Menu, Input } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
const InputGroup = Input.Group;

class NavigationHeader extends Component {
  render() {
    return (
      <Header className="header">               
        <div>
          <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}>
                <Menu.Item key="1" style={{fontSize:'1.75em'}}>Goerli</Menu.Item>                                                
                <Menu.Item key="6" style={{float:'right'}}>Options</Menu.Item>
            </Menu>
        </div>           
      </Header>
    );
  }
}

export default NavigationHeader;
