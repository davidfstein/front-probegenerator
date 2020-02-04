import React from 'react';
import './Body.css';
import { generateProbes } from '../../Services/probe-service';
import { 
    Form, 
    FormGroup, 
    FormText, 
    Label, 
    Input, 
    Col, 
    Row, 
    Button, 
    Card, 
    CardHeader, 
    CardBody } 
from 'reactstrap';

export default class Body extends React.Component {

    constructor() {
        super();
        this.state = {
            initiatorsAdded: 1,
        }
    }

    handleAddInitiatorClick = () => {
        this.setState({
            initiatorsAdded: this.state.initiatorsAdded + 1
        });
    }

    renderInitiators = () => {
        const rows = [];
        for (let i = 0; i < this.state.initiatorsAdded; i++) {
            rows.push(
                <Row key="i">
                    <Col lg="1">
                        <Input type="text" name={`initiator${i}`} id={`initiator${i}`} maxLength="2" placeholder="Name"></Input>
                    </Col>
                    <Col lg="2">
                        <Input type="text" name={`initiator${i}Left`} id={`initiator${i}Left`} placeholder="Left Sequence"></Input>
                    </Col>
                    <Col lg="2">
                        <Input type="text" name={`initiator${i}LeftSpacer`} id={`initiator${i}LeftSpacer`} maxLength="2" placeholder="Left Spacer"></Input>
                    </Col>
                    <Col lg="2">
                        <Input type="text" name={`initiator${i}Right`} id={`initiator${i}Right`} placeholder="Right Sequence"></Input>
                    </Col>
                    <Col lg="2">
                        <Input type="text" name={`initiator${i}RightSpacer`} id={`initiator${i}RightSpacer`} maxLength="2" placeholder="Right Spacer"></Input>
                    </Col>
                </Row>
            )
        }
        return rows;
    }

    submitForm = () => {
        const form = document.getElementById("generateForm");
        const data = new FormData(form);
        generateProbes(data);
    }

    render() {
        return (
            <Form id="generateForm">
                <Card>
                    <CardHeader><h3>Generate Probes</h3></CardHeader>
                    <CardBody>
                        <FormGroup>
                            <Label for="bowtieSelect">
                                Bowtie2 Index
                            </Label>
                            <Input className="col-lg-2" type="select" name="bowtieSelect" id="bowtieSelect">
                                <option>
                                    Axolotl
                                </option>
                                <option>
                                    Mouse (mm10)
                                </option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="fastaFile">
                                Fasta Sequences
                            </Label>
                            <Input type="file" name="fastaFile" id="fastaFile"></Input>
                            <FormText color="muted">
                                Upload the fasta file with the sequences for which you wish
                                to generate probes.
                            </FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="initiators">
                                Initiators
                            </Label>
                            {this.renderInitiators()}
                            <Button color="primary" className="addInitiator" onClick={this.handleAddInitiatorClick}>
                                Add Initiator
                            </Button>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col lg="2">
                                    <Label for="numSpaces">
                                        Desired Spaces
                                    </Label>
                                    <Input type="number" defaultValue="2" id="numSpaces" name="numSpaces"></Input>
                                </Col>
                                <Col lg="2">
                                    <Label for="probeLength">
                                        Probe Length
                                    </Label>
                                    <Input type="number" defaultValue="25" id="probeLength" name="probeLength"></Input>
                                </Col>
                                <Col lg="2">
                                    <Label for="minGC">
                                        Min. GC Content %
                                    </Label>
                                    <Input type="number" defaultValue="20" id="minGC" name="minGC"></Input>
                                </Col>
                                <Col lg="2">
                                    <Label for="minGC">
                                        Max. GC Content %
                                    </Label>
                                    <Input type="number" defaultValue="80" id="maxGC" name="maxGC"></Input>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col lg="2">
                                    <Label for="minTm">
                                        Min. Melting Temp.
                                    </Label>
                                    <Input type="number" defaultValue="37" id="minTm" name="minTm"></Input>
                                </Col>
                                <Col lg="2">
                                    <Label for="maxTm">
                                        Max. Melting Temp.
                                    </Label>
                                    <Input type="number" defaultValue="72" id="maxTm" name="maxTm"></Input>
                                </Col>
                                <Col lg="2">
                                    <Label for="saltConcentration">
                                        Salt Concentration
                                    </Label>
                                    <Input type="number" defaultValue="1000" id="saltConcentration" name="saltConcentration"></Input>
                                </Col>
                                <Col lg="2">
                                    <Label for="formamide">
                                        % Formamide
                                    </Label>
                                    <Input type="number" defaultValue="30" id="formamide" name="formamide"></Input>
                                </Col>
                            </Row>
                        </FormGroup>
                        <Button type="button" onClick={this.submitForm} color="primary">
                            Submit
                        </Button>
                    </CardBody>
                </Card>
            </Form>    
        )
    }
}