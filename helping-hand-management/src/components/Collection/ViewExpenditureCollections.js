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
class ViewExpenditureCollections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenditures: []
        }
    }

    componentDidMount() {
        const expenditureRef = this.props.db.database().ref('expenditure');
        expenditureRef.on('value', (snapshot) => {
            let expenditures = snapshot.val();
            let newexpendituresState = [];
            for (let expenditure in expenditures) {
                newexpendituresState.push({
                    id: expenditure,
                    name: expenditures[expenditure].name,
                    amount: expenditures[expenditure].amount,
                    date: expenditures[expenditure].date,
                    description: expenditures[expenditure].description
                });
            }
            this.setState({
                expenditures: newexpendituresState
            });
        })
    }

    deleteExpenditure(expenditureId) {


        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        console.log("delete expenditureId " + expenditureId);
                        const expenditureItemRef = this.props.db.database().ref(`/expenditure/${expenditureId}`);
                        expenditureItemRef.remove(function(error) {
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

                <Table hover responsive className="table-outline mb-0 d-sm-table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th className="text-center">Amount</th>
                            <th>Date</th>
                            <th>Discription</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.expenditures.map((expenditure) => {
                                return (
                                
                                    <tr>
                                    <td>
                                        <div>{expenditure.name}</div>
                                    </td>
                                  
                                    <td className="text-center">
                                        <div>Amount: {expenditure.amount}</div>
                                    </td>
                                    <td>
                                        <div>{expenditure.date}</div>   
                                    </td>
                                    <td>
                                        <div>{expenditure.description}</div>   
                                    </td>
                                    <td className="text-center" >
                                        <i className="fa fa-trash" onClick={() =>
                                             this.deleteExpenditure(expenditure.id)} style={{ fontSize: 24 + 'px', color: '#000000' }}></i>
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
export default ViewExpenditureCollections;