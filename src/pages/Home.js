import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { Layout, Menu, Button, Row, Col } from 'antd';
import '../App.css';
const { Header, Content, Footer, Sider } = Layout;

function Home() {

    const [category, setCategory] = useState([])
    const [Images, setImages] = useState([])
    const [count, setCount] = useState(10)
    const [categoryId, setCategoryId] = useState(1)

    useEffect(() => {
        fetchCategory();
        fetchImages();
    }, [count, categoryId])

    const fetchCategory = async () => {
        const response = await fetch("https://api.thecatapi.com/v1/categories")
        const data = await response.json()
        setCategory(data);
    }
    const fetchImages = async () => {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${count}&category_ids=${categoryId}`)
        const data = await response.json()
        setImages(data);
    }
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = (collapsed) => {
        setCollapsed(collapsed);
    };
    function handleMenuClick(e) {
        category.map((c, i) => {
            if (e.key === `${i}`) {
                setCategoryId(c.id)
            }
        })
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <Menu theme="dark" mode="inline" style={{ marginTop: 60 }} onClick={handleMenuClick}>
                    {category.map((c, i) => (
                        <Menu.Item key={i}>
                            {c.name}
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} >
                    <h3 style={{ color: 'white', textAlign: 'center' }}>Cat Images</h3>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Row justify="start">
                            {Images.map((img, i) => (
                                <Col span={2} style={{ marginBottom: '10px' }}>
                                    <img src={img.url} width="100" height="100" />
                                </Col>
                            ))}
                        </Row>
                        <Button
                            type="primary"
                            onClick={() => {
                                setCount(count + 10)
                            }}>
                            Show More
                        </Button>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout>
        </Layout>
    );
}

export default Home;
