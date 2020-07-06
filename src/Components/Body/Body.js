import React from 'react';
import { withRouter } from 'react-router-dom';
import './Body.css';
import { generateProbes, getBowtieIndexOptions } from '../../Services/probe-service';
import { checkCaptcha } from '../../Services/captcha-service';
import Recaptcha from 'react-recaptcha';
import Constants from '../../Constants';
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
    CardBody,
    Collapse } 
from 'reactstrap';

class Body extends React.Component {

    constructor() {
        super();
        this.state = {
            initiatorsAdded: 4,
            bowtieOptions: [],
            verified: false,
            isOpen: false
        }
    }

    componentDidMount() {
        this.generateBowtieIndexOptions();
    }

    handleAddInitiatorClick = () => {
        this.setState({
            initiatorsAdded: this.state.initiatorsAdded + 1,
            bowtieOptions: this.state.bowtieOptions
        });
    }

    renderInitiators = () => {
        const rows = [];
        for (let i = 1; i <= this.state.initiatorsAdded; i++) {
            const nameKey = `B${i}_NAME`;
            const leftSeqKey = `B${i}_LEFT_SEQUENCE`;
            const leftSpacerKey = `B${i}_LEFT_SPACER`;
            const rightSeqKey = `B${i}_RIGHT_SEQUENCE`;
            const rightSpacerKey = `B${i}_RIGHT_SPACER`;
            rows.push(
                <Row key="i">
                    <Col lg="1">
                        <Input type="text" name={`initiator${i}`} id={`initiator${i}`} maxLength="2" placeholder="Name" defaultValue={Constants[nameKey]}></Input>
                    </Col>
                    <Col lg="2">
                        <Input type="text" name={`initiator${i}Left`} id={`initiator${i}Left`} placeholder="Left Sequence" defaultValue={Constants[leftSeqKey]}></Input>
                    </Col>
                    <Col lg="2">
                        <Input type="text" name={`initiator${i}LeftSpacer`} id={`initiator${i}LeftSpacer`} maxLength="2" placeholder="Left Spacer" defaultValue={Constants[leftSpacerKey]}></Input>
                    </Col>
                    <Col lg="2">
                        <Input type="text" name={`initiator${i}Right`} id={`initiator${i}Right`} placeholder="Right Sequence" defaultValue={Constants[rightSeqKey]}></Input>
                    </Col>
                    <Col lg="2">
                        <Input type="text" name={`initiator${i}RightSpacer`} id={`initiator${i}RightSpacer`} maxLength="2" placeholder="Right Spacer" defaultValue={Constants[rightSpacerKey]}></Input>
                    </Col>
                </Row>
            )
        }
        return rows;
    }

    generateBowtieIndexOptions = async () => {
        const options = await getBowtieIndexOptions();
        const optionElements = [];
        for (let i = 0; i < options.length; i++) {
            optionElements.push(
                <option key={i}>
                    {options[i]}
                </option>
            )
        }
        this.setState({
            initiatorsAdded: this.state.initiatorsAdded,
            bowtieOptions: optionElements
        });
    }

    verifyCallback = async (value) => {
        // Have to do this ridiculousness because formidable and body-parse
        // don't play nice. Thats what I get for using libraries.
        const data = new FormData();
        data.append('g-recaptcha-response', value);
        const result = await checkCaptcha(data);
        if (result !== this.state.verified) {
            this.setState({
                initiatorsAdded: this.state.initiatorsAdded,
                bowtieOptions: this.state.bowtieOptions,
                verified: result
            })
        }
    }

    onloadCallback = () => {
        console.log("Hi");
    }

    toggle = () => this.setState({isOpen: !this.state.isOpen});

    submitForm = async () => {
        const form = document.getElementById("generateForm");
        const data = new FormData(form);
        const status = await generateProbes(data);
        if (status === 200) {
            this.props.history.push({
                pathname: '/results',
                state: { 
                    head: "Thank You!",
                    body: "Your data is being processed. You will recieve an email with your results shortly.",
                    submitted: true
                }
            });
        } else {
            this.props.history.push({
                pathname: '/results',
                state: { 
                    head: "Something went wrong...",
                    body: "There was a problem processing your data. Please try again. If the issue persists, contact us at davidmonlab.gmail.com.",
                    submitted: true
                }
            });
        }
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
                                {this.state.bowtieOptions}
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
                        <FormGroup>
                            <Label for="email">
                                Email
                            </Label>
                            <Input className="col-lg-2" type="email" name="email" id="email"></Input>
                        </FormGroup>
                        <p class="clickable" onClick={this.toggle}>Advanced&#9660;</p>
                        <Collapse isOpen={this.state.isOpen}>
                            <FormGroup>
                                <Label for="outputCleanSelect">Output Clean Method</Label>
                                <Input className="col-lg-2" type="select" name="outputCleanSelect" id="outputCleanSelect">
                                    <option defaultChecked>Unique</option>
                                    <option>LDA</option>
                                </Input>
                            </FormGroup>
                        </Collapse>
                        <Recaptcha
                            sitekey="6LdSQNwUAAAAACvxsNUrlK9civfkN2V1m_JIv0jE"
                            verifyCallback={this.verifyCallback}
                            onloadCallback={this.onloadCallback}
                            render='explicit'
                        />
                        {this.state.verified ?
                            <Button type="button" onClick={this.submitForm} color="primary">
                                Submit
                            </Button>
                            :
                            <Button type="button" onClick={this.submitForm} color="primary" disabled>
                                Submit
                            </Button>
                        }
                        
                    </CardBody>
                </Card>
            </Form>    
        )
    }
}

export default withRouter(Body);