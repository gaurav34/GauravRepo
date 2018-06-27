import React, { Component } from 'react';

import {
    Row,
    Col,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Collapse,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';

import DatePicker from 'react-date-picker';
class AddExpenditureCollection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            amount: '',
            description:'',
            datevalue: new Date()
        }
        this.onDateChanged = this.onDateChanged.bind(this);
    }

    onAmountChanged(e) {
        console.log("onAmountChanged " + e.target.value);
        this.setState({ amount: e.target.value });

    }

    onNameChanged(e) {
        console.log("onNameChanged " + e.target.value);
        this.setState({ name: e.target.value });

    }

    onDescriptionChanged(e) {
        this.setState({ description: e.target.value });

    }

    onDateChanged(value) {
        console.log("onDateChanged " + value);
        this.setState({ datevalue: value });

    }

    onSubmitExpenditure(e) {
        e.preventDefault();
        if (!this.state.name) {
            alert("Name is empty!!!");
        } else if (!this.state.amount) {
            alert("Amount is empty!!!");
        } else if (!this.state.datevalue) {
            alert("Date is empty!!!");
        } else {
            const expenditureRef = this.props.db.database().ref('expenditure');
            const expenditure = {
                name: this.state.name,
                amount: this.state.amount,
                date: this.state.datevalue.toDateString(),
                description:this.state.description
            }
            expenditureRef.push(expenditure, function(error) {
                if (error) {
                    alert("Failure!!!");
                } else {
                    alert("Successful Added!!!");
                }
            });
            this.setState({
                name: '',
                amount: '',
                date: '',
                description:''
    
            });   
        }
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row >
                    <Col xs="12" md="6">
                        <Card>
                            <CardHeader>
                                <strong>Add Expenditure</strong>
                            </CardHeader>
                            <CardBody>
                                <Form className="form-horizontal">

                                <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="name-input">Name</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="name-input" value={this.state.name} name="name-input" onChange={(e) => this.onNameChanged(e)} placeholder="Name" />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="amount-input">Amount</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="amount-input" value={this.state.amount} name="amount-input" onChange={(e) => this.onAmountChanged(e)} placeholder="amount" />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="date-input">Date</Label>
                                        </Col>
                                       
                                        <Col xs="12" md="9">

                                            <DatePicker placeholder="Placeholder" value={this.state.datevalue} id="date-input" onChange={this.onDateChanged} />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="description-input">Description</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="description-input" value={this.state.description} name="description-input" onChange={(e) => this.onDescriptionChanged(e)} placeholder="Description" />
                                        </Col>
                                    </FormGroup>

                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="primary" onClick={(e) => this.onSubmitExpenditure(e)}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AddExpenditureCollection;
