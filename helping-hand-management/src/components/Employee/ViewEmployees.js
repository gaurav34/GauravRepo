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
    InputGroupText,
    Table
} from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class ViewEmployees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        const employee = this.props.db.database().ref('employee');
        employee.on('value', (snapshot) => {
            let employees = snapshot.val();
            let newEmployeesState = [];
            for (let employee in employees) {
                newEmployeesState.push({
                    id: employee,
                    name: employees[employee].name,
                    empid: employees[employee].id,
                    designation: employees[employee].designation,
                    dob: employees[employee].dob,
                    bloodgroup: employees[employee].bloodgroup
                });
            }
            this.setState({
                employees: newEmployeesState
            });
        })
    }

    deleteEmployee(employeeId) {


        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        console.log("delete collection " + employeeId);
                        const employeeItemRef = this.props.db.database().ref(`/employee/${employeeId}`);
                        employeeItemRef.remove(function(error) {
                            if (error) {
                                alert("Failure!!!");
                            } else {
                                alert("Successful Deleted!!!");
                            }
                        });
                    }
                },
                {
                    label: 'No',
                    //onClick: () => alert('Click No')
                }
            ]
        })
    }

    render() {
        return (
            <div>

                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                    <thead className="thead-light">
                        <tr>
                            <th>Employee ID</th>
                            <th className="text-center">Employee Name</th>
                            <th>Designation</th>
                            <th>DOB</th>
                            <th>Blood Group</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.employees.map((employee) => {
                                return (
                                
                                    <tr>
                                    <td>
                                        <div>{employee.empid}</div>
                                    </td>
                                  
                                    <td className="text-center">
                                        <div>{employee.name}</div>
                                    </td>
                                    <td>
                                        <div>{employee.designation}</div>
                                        
                                    </td>
                                    <td>
                                        <div>{employee.dob}</div>
                                    </td>
                                    <td>
                                        <div>{employee.bloodgroup}</div>
                                        
                                    </td>
                                    <td className="text-center" >
                                        <i className="fa fa-trash" onClick={() => this.deleteEmployee(employee.id)} style={{ fontSize: 24 + 'px', color: '#000000' }}></i>
                                    </td>
                                </tr>
                                )
                            })}
                        
                    </tbody>
                </Table>
            </div>
        )
    }

}
export default ViewEmployees;