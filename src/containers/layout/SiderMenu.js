import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import NavigationHeader from './Header';
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

class SiderMenu extends Component {
  state= {
    current: 1,
  }

  handleClick = (index) => {
    this.setState({current: index})
  };

  render() {
    return (
       <Sider width={200} style={{ background: '#fff' }}>
        <Menu
            mode="inline"
            defaultOpenKeys={['sub1', 'sub2']}
            style={{ height: '100%', borderRight: 0 }}
        >
        <SubMenu key="sub1" title={<span><Icon type="laptop" />Network</span>}>
            <Menu.Item key="1">
                <Link to="/stats" onClick={() => this.handleClick(1)}>Network Stats</Link> 
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/bridge" onClick={() =>this.handleClick(2)}>Bridge</Link> 
             </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="user" />Information</span>}>
            <Menu.Item key="5">
                <Link to="/about" onClick={() => this.handleClick(4)}>About</Link> 
            </Menu.Item>
            <Menu.Item key="6">
                <Link to="/wiki" onClick={() =>this.handleClick(5)}> Wiki </Link> 
            </Menu.Item>    
            <Menu.Item key="7">
                <Link to="/blog" onClick={() =>this.handleClick(6)}> Blog </Link> 
            </Menu.Item>     
            <Menu.Item key="8">
                <Link to="/roadmap" onClick={() =>this.handleClick(7)}>Roadmap </Link> 
            </Menu.Item>              
        </SubMenu>
        </Menu>
    </Sider>
    );
  }
}

export default SiderMenu;
