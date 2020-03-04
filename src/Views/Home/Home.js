import React from 'react';
import Header from '../../Components/Header/Header';
import Body from '../../Components/Body/Body';
import { Container } from 'reactstrap';

const Home = () => {
    return (
        <Container className="App">
            <Header />
            <Body />
        </Container>
    )
}

export default Home;