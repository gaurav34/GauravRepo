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
class AddEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
            dob: new Date(),
            bloodgroup: '',
            designation: ''

        }
        this.onDOBChanged = this.onDOBChanged.bind(this);
    }

    onNameChanged(e) {
        this.setState({ name: e.target.value });
    }

    onIdChanged(e) {
         this.setState({ id: e.target.value });
    }

    onBloodGroupChange(e) {
        this.setState({ bloodgroup: e.target.value });
    }

    onDesignationChanged(e) {
        this.setState({ designation: e.target.value });

    }

    onDOBChanged(value) {
       this.setState({ dob: value });
    }

    onSubmitEmployee(e) {
        e.preventDefault();
        if (!this.state.name) {
            alert("Name is empty");
        } else if(!this.state.id) {
            alert("Employee Id is empty");
        } else if (!this.state.designation) {
            alert("Designation is empty");
        } else if (!this.state.bloodgroup) {
            alert("Blood Group is empty");
        } else if (!this.state.dob) {
            alert("DOB is empty");
        } else {
            const employeeRef = this.props.db.database().ref('employee');
            const employee = {
                name: this.state.name,
                id: this.state.id,
                dob: this.state.dob.toDateString(),
                designation: this.state.designation,
                bloodgroup: this.state.bloodgroup
            }
            employeeRef.push(employee, function(error) {
                if (error) {
                    alert("Failure!!!");
                } else {
                    alert("Successful Added!!!");
                }
            });
            this.setState({
                name: '',
                name: '',
                id: '',
                dob: new Date(),
                designation: '',
                bloodgroup: ''
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
                                <strong>Add Employee</strong>
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
                                            <Label htmlFor="id-input">Emp Id</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="id-input" className="is-valid" value={this.state.id} name="id-input" onChange={(e) => this.onIdChanged(e)} placeholder="Id" />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="designation-input">Designation</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="designation-input" value={this.state.designation} name="designation-input" onChange={(e) => this.onDesignationChanged(e)} placeholder="Designation" />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="select-blood-group">BloodGroup</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" name="select-blood-group" id="select-blood-group" value={this.state.bloodgroup} onChange={(e) => this.onBloodGroupChange(e)}>
                                                <option value="0">Please select</option>
                                                <option value="A+">A+</option>
                                                <option value="B+">B+</option>
                                                <option value="AB+">AB+</option>
                                                <option value="O+">O+</option>
                                                <option value="A-">A+</option>
                                                <option value="B-">B+</option>
                                                <option value="AB-">AB+</option>
                                                <option value="O-">O+</option>
                                            </Input>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="date-dob">DOB</Label>
                                        </Col>
                                        <Col xs="12" md="9">

                                            <DatePicker placeholder="Placeholder" value={this.state.dob} id="date-dob" onChange={this.onDOBChanged} />
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="primary" onClick={(e) => this.onSubmitEmployee(e)}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AddEmployee;
