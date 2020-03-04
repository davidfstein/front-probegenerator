import React from 'react';
import Header from '../Header/Header';
import { withRouter } from 'react-router-dom';
import {
    Card, 
    CardHeader, 
    CardBody,
    Container } 
from 'reactstrap';

class Results extends React.Component {
    
    componentDidMount() {
        if (typeof this.props.location.state === 'undefined' || !this.props.location.state.submitted) {
            this.props.history.push("/");
        }
    }

    render() {
        const {head, body, _} = typeof this.props.location.state !== 'undefined' ? this.props.location.state : {head:'',body:'',submitted:''};
        return (
            // TODO: Move container and header into a view
            <Container className="App">
                <Header />
                <Card>
                    <CardHeader><h3>{head}</h3></CardHeader>
                    <CardBody>
                        {body}
                    </CardBody>
                </Card>
            </Container>
        )
    }
}

export default withRouter(Results);