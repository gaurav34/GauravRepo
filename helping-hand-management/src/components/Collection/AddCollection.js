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
class AddCollection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            amount: '',
            date: '',
            datevalue: new Date(),
            employees: []
        }
        this.onDateChanged = this.onDateChanged.bind(this);
    }

    componentDidMount() {
        const employee = this.props.db.database().ref('employee');
        employee.on('value', (snapshot) => {
            let employees = snapshot.val();
            console.log("employees size " + employees.size);
            console.log("employees " + employees);
            let newEmployeeState = [];
            for (let employee in employees) {
                newEmployeeState.push({
                    id: employee,
                    eid: employees[employee].id,
                    name: employees[employee].name,
                    dob: employees[employee].dob,
                    designation: employees[employee].designation,
                    bloodgroup: employees[employee].bloodgroup
                });
            }
            console.log("emp " + newEmployeeState.size);
            this.setState({
                employees: newEmployeeState
            });
        })
    }

    onAmountChanged(e) {
        console.log("onAmountChanged " + e.target.value);
        this.setState({ amount: e.target.value });

    }

    onNameChanged(e) {
        console.log("onNameChanged " + e.target.value);
        this.setState({ name: e.target.value });

    }

    onDateChanged(value) {
        console.log("onDateChanged " + value);
        this.setState({ datevalue: value });

    }

    onSubmitCollection(e) {
        e.preventDefault();
        if (!this.state.name) {
            alert("Name is empty!!!");
        } else if (!this.state.amount) {
            alert("Amount is empty!!!");
        } else if (!this.state.datevalue) {
            alert("Date is empty!!!");
        } else {
            const collectionRef = this.props.db.database().ref('collection');
            const collection = {
                name: this.state.name,
                amount: this.state.amount,
                date: this.state.datevalue.toDateString()
            }
            collectionRef.push(collection, function(error){
                if(error) {
                    alert("Failure!!!");
                } else {
                    alert("Sucessful Added!!!");
                }
            });
            this.setState({
                name: '',
                amount: '',
                date: '',
    
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
                                <strong>Add Collection</strong>
                            </CardHeader>
                            <CardBody>
                                <Form className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="select">Select Employee</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" name="select" id="select" value={this.state.name} onChange={(e) => this.onNameChanged(e)}>
                                                <option value="0">Please select</option>

                                                {this.state.employees.map((employee) => {
                                                    return(
                                                    <option value={employee.name}>{employee.name}</option>
                                                )})}
                                            </Input>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="amount-input">Amount</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="number" id="amount-input" value={this.state.amount} name="amount-input" onChange={(e) => this.onAmountChanged(e)} placeholder="amount" />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="date-input">Date</Label>
                                        </Col>
                                        {/* <Col xs="12" md="9">
                                            <Input type="text" value={this.state.date} id="date-input" onChange={(e) => this.onDateChanged(e)} name="date-input" placeholder="date" />
                                        </Col> */}
                                        <Col xs="12" md="9">

                                            <DatePicker placeholder="Placeholder" value={this.state.datevalue} id="date-input" onChange={this.onDateChanged} />
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="primary" onClick={(e) => this.onSubmitCollection(e)}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AddCollection;
