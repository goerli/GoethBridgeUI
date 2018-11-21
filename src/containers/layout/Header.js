import React, { Component } from 'react';
import 'antd/dist/antd.css'
import './Header.css';
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header } = Layout;
const MenuItemGroup = Menu.ItemGroup;

class NavigationHeader extends Component {
  render() {
    return (
      <Header className="header">               
        <div>
          <div className="logo" />
            <Menu theme="dark" mode="horizontal" className="menuStyle">
                <Menu.Item key="2" className='orgName'> <img className='orgImage' src={require('../../assets/images/goerli.png')} alt="fds" /> G&ouml;rli Bridge UI</Menu.Item>              
                <SubMenu className='subMenuContainer' 
                  title={
                    <span className="submenu-title-wrapper">
                      <Icon type="setting" />
                      Links/Resources
                    </span>
                  }>
                  <MenuItemGroup title="Links">
                    <Menu.Item key="setting:1"><a href='https://github.com/goerli'>Github</a></Menu.Item>
                    <Menu.Item key="setting:2"><a href='https://gitter.im/goerli'>Gitter</a></Menu.Item>
                    <Menu.Item key="setting:3"><a href='https://blockscout.com/eth/goerli'>Goerli Explorer</a></Menu.Item>
                    <Menu.Item key="setting:4"><a href='https://stats.goerli.net/'>Goerli Stats</a></Menu.Item>
                  </MenuItemGroup>                
                </SubMenu>
            </Menu>
        </div>           
      </Header>
    );
  }
}

export default NavigationHeader;
