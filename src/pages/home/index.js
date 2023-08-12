import React, {useEffect, useState} from 'react';
import {
    ClusterOutlined, LinkOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, theme, Row, Col, Progress, Space, Divider} from 'antd';
import "./index.scss"
import {Link, Outlet} from "react-router-dom";
import logo from '../../../src/static/logo.png'
import homepage from '../../../src/static/homePage.png'

const { Header, Sider, Content,Footer } = Layout;

const Home  = (props) => {
    const {finalProcess,getFianlCommand} = props

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    function sendFinalCommand(){
        getFianlCommand(true)
    }
    
    function refreshPage() {
        window.location.href='/'
    }

    const [homePage,setHomePage] = useState(true)

    return (
        <Layout hasSider>
            <Sider trigger={null} collapsible collapsed={collapsed}
                   style={{
                       overflow: 'auto',
                       height: '100vh',
                       position: 'fixed',
                       left: 0,
                       top: 0,
                       bottom: 0,
                   }}
            >
                <div className="demo-logo-vertical"/>
                <Menu
                    theme="dark"
                    mode="inline"
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: <Link to="/home/dataset" onClick={()=>setHomePage(false)}>Dataset</Link>,
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: <Link to="/home/model" onClick={()=>setHomePage(false)}>Model (Project)</Link>,
                        },
                        {
                            key: '3',
                            icon: <ClusterOutlined />,
                            label: <Link to="/home/modelmore" onClick={()=>setHomePage(false)}>Model (Industry)</Link>,
                        },
                        {
                            key: '4',
                            icon: <UploadOutlined />,
                            label: <Link to="/home/result" onClick={()=>setHomePage(false)}>Result</Link>,
                        },
                        {
                            key: '5',
                        },
                        {
                            key: '6',
                            icon:<LinkOutlined />,
                            label: <Link to="/" onClick={()=>setHomePage(true)}><span style={{color:"white"}}>Home Page</span></Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout" style={{marginLeft: 200}}>
                <Header style={{ padding: 0, background: colorBgContainer}}>
                    <Row style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <Col span={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}}><img src={logo} style={{width:"80%"}}/></Col>
                        <Col span={12} style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
                            <Progress
                                type="circle"
                                percent={finalProcess*100}
                                size={40}
                                strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                                style={{marginRight:"7px"}}
                            />
                            <Button
                                danger
                                style={{width:"auto"}}
                                disabled={finalProcess !== 1}
                                onClick={sendFinalCommand}
                            >Start to train models</Button>
                        </Col>
                        <Col span={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <Button
                                block
                                style={{width:"auto"}}
                                onClick={refreshPage}
                            >Clean up training cache</Button>
                        </Col>

                    </Row>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px 0',
                        overflow:"initial"
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            background: colorBgContainer,
                        }}
                    >
                        {homePage?<img src={homepage} style={{width:"100%"}}/>:null}
                        <Outlet />
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Design ©2023 Created by Chucky
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Home;